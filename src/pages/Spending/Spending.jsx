import React, { useEffect, useState } from 'react'
import * as eventApi from '../../utilities/api/event'
import Header from '../../components/Header/Header'
import AddSpendingModal from '../../components/AddSpendingModal/AddSpendingModal'
import PieChart from '../../components/PieChart/PieChart'

import './spending.css'

const Spending = () => {
    
    const [month, setMonth] = useState(new Date().toLocaleString().substring(0,2))
    
    const [events, setEvents] = useState([])
    const [expense, setExpense] = useState(null);
    const [totalExpense, setTotalExpense] = useState(null)
    const [foodExpense, setFoodExpense] = useState(null)
    const [hotelExpense, setHotelExpense] = useState(null)
    const [attractionExpense, setAttractionExpense] = useState(null)
    

    const [modalOpen, setModalOpen] = useState(false);
    const [modalId, setModalId] = useState(null);


    useEffect(function(){
        async function getSpending(){
            const events = await eventApi.getEvents()
            const finishEvent = events.data.filter(events => events.isFinish === true)

            const curMonthEvents = finishEvent.filter((event)=>(event.start.substring(5,7) === month))
            setEvents(curMonthEvents)
            
            const totalExpense = curMonthEvents.map(event => event.expense).reduce((a,b)=> a+b, 0)
            setTotalExpense(totalExpense)

            const curMonthFoodEvent = curMonthEvents.filter((event) => event.color === "#95bb72")
            const curMonthFoodExpense = curMonthFoodEvent.map(event => event.expense).reduce((a,b)=> a+b, 0)
            setFoodExpense(curMonthFoodExpense)
            
            const curMonthHotelEvent = curMonthEvents.filter((event) => event.color === "#da8ee7")
            const curMonthHotelExpense = curMonthHotelEvent.map(event => event.expense).reduce((a,b)=> a+b, 0)
            setHotelExpense(curMonthHotelExpense)
            
            const curMonthAttractionEvent = curMonthEvents.filter((event) => event.color === "#6699CC")
            const curMonthAttractionExpense = curMonthAttractionEvent.map(event => event.expense).reduce((a,b)=> a+b, 0)
            setAttractionExpense(curMonthAttractionExpense)
            
        };
        getSpending()
    },[month, expense, totalExpense, foodExpense, hotelExpense,attractionExpense])




  return (
    <>
        <Header/>
        <div className='mt-5 d-flex justify-content-center'>
            <label htmlFor="month" className='mt-2'>Month: </label>
            <select name="month" id="" className="form-control ms-3 month__select" value={month} onChange={e=> setMonth(e.target.value)}>
                <option disabled value="null">Select an Month</option>
                <option value={"1"}>January</option>
                <option value={"2"}>February</option>
                <option value={"3"}>March</option>
                <option value={"4"}>April</option>
                <option value={"5"}>May</option>
                <option value={"6"}>June</option>
                <option value={"7"}>July</option>
                <option value={"8"}>August</option>
                <option value={"9"}>September</option>
                <option value={"10"}>October</option>
                <option value={"11"}>November</option>
                <option value={"12"}>December</option>
            </select>
        </div>
        <div className='mt-4 d-flex justify-content-around'>  
            <div className='d-flex flex-column align-items-center'>
                <div className='me-5'>
                    <strong>Total Expense:</strong> {totalExpense}
                </div>
                <div>
                <PieChart
                    food={foodExpense}
                    hotel={hotelExpense}
                    attraction={attractionExpense}
                />
                </div>
            </div>
            <div className='d-flex flex-column justify-content-center'>
                <div>
                    Total <span style={{color:'#95bb72'}}>Food</span> Expense: {foodExpense}
                </div>
                <div>
                    Total <span style={{color:'#da8ee7'}}>Hotel</span> Expense: {hotelExpense}
                </div>
                <div>
                    Total <span style={{color:'#6699CC'}}>Attraction</span> Expense: {attractionExpense}
                </div>
            </div>
        </div>
        <div className='mt-5 container-fluid'>
        <div className='row row-cols-4 justify-content-center'>  
            {events.map((event)=> {
                const start = new Date(event.start)
                const end = new Date(event.end)
                return (
                        <div className='mb-2 mx-2 row card'>
                            <div className='card-body'> 
                                <h5 className="card-title mb-3" style={{color: event.color}}>{event.title} {event.color === "#95bb72" ? <span>🍔</span> : event.color === "#da8ee7" ? <span>🏠</span> : event.color === "#6699CC" ? <span>🏖</span> : "" }</h5>
                                <p className='card-text'><strong>Start:</strong> {start.toDateString().substring(4,10)} - {start.toLocaleTimeString().substring(0,4)}{start.toLocaleTimeString().substring(7,11)}</p>
                                <p className='card-text'><strong>End:</strong> {end.toDateString().substring(4,10)} - {end.toLocaleTimeString().substring(0,4)}{end.toLocaleTimeString().substring(7,11)}</p>
                                <p><strong>Expense:</strong> {event.expense}</p>
                                <button onClick={()=> {
                                    setModalOpen(true)
                                    setModalId(event._id)
                                    }}
                                    className="btn btn-blue">Edit Expense</button>
                                <AddSpendingModal 
                                    isOpen={modalOpen}
                                    onClose={()=> setModalOpen(false)}
                                    modalId = {modalId}
                                    expense = {expense}
                                    setExpense = {setExpense}
                                    />
                            </div>
                        </div>
            )})}
        </div>
        </div>
    </>
  )
}

export default Spending