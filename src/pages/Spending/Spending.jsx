import React, { useEffect, useState } from 'react'
import * as eventApi from '../../utilities/api/event'
import Header from '../../components/Header/Header'
import AddSpendingModal from '../../components/AddSpendingModal/AddSpendingModal'

const Spending = () => {
    
    const [events, setEvents] = useState([])
    const [expense, setExpense] = useState(null);
    const [month, setMonth] = useState(new Date().toLocaleString().substring(0,2))
    const [modalOpen, setModalOpen] = useState(false);
    const [modalId, setModalId] = useState(null);


    useEffect(function(){
        async function getSpending(){
            const events = await eventApi.getEvents()
            const curMonthEvents = events.data.filter((event)=>(event.start.substring(5,7) === month))
            setEvents(curMonthEvents)
        };
        getSpending()
    },[month,expense])




  return (
    <>
        <Header/>
        <div>
            <select name="month" id="" class="form-control m-5 w-50" value={month} onChange={e=> setMonth(e.target.value)}>
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
        <div className='mt-5'>
        {events.map((event)=> {
            const start = new Date(event.start)
            const end = new Date(event.end)
            return (
            <div className='card mb-2'>
                <div className='card-body'> 
                    <h5 className="card-title mb-3" style={{color: event.color}}>{event.title} {event.color === "#95bb72" ? <span>🍔</span> : event.color === "#da8ee7" ? <span>🏠</span> : event.color === "#6699CC" ? <span>🏖</span> : "" }</h5>
                    <p className='card-text'><strong>Start:</strong> {start.toDateString().substring(4,10)} - {start.toLocaleTimeString().substring(0,5)}{start.toLocaleTimeString().substring(5,11)}</p>
                    <p className='card-text'><strong>End:</strong> {end.toDateString().substring(4,10)} - {end.toLocaleTimeString().substring(0,5)}{end.toLocaleTimeString().substring(5,11)}</p>
                    <p>Expense: {event.expense}</p>
                    <button onClick={()=> {
                        setModalOpen(true)
                        setModalId(event._id)
                        }}
                        className="btn btn-blue">Add Expense</button>
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
    </>
  )
}

export default Spending