import React from 'react'
import { useState } from 'react'
import Modal from 'react-modal'
import Datetime from 'react-datetime'
import moment from 'moment'
import "react-datetime/css/react-datetime.css";
import './addEventModal.css'

const customStyles = {
    content: {
    top: '40%',
    borderRadius:"1rem",
    padding:'2rem 1rem'
    }
}

const categoryColor = {
    Food : "#95bb72",
    Hotel : "#da8ee7",
    Attraction: "#6699CC"
}

const AddEventModal = ({isOpen, onClose, onEventAdded, place, placeName}) => {


    const eventTitle = {place} === undefined ? "" : placeName

    const [title, setTitle] = useState(eventTitle)
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())
    const [color, setColor] = useState(categoryColor.Food)


    const onSubmit = (event) => {
        event.preventDefault();
        onEventAdded({
            title:title,
            start:moment(start).toDate(),
            end:moment(end).toDate(),
            color:color
        })
        onClose()
    }

  return (
    <div className=''>
        <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
        <form onSubmit={onSubmit} className="form">
            <input type="text" className='form-control' placeholder='Add Event Title' value={title} onChange={e => setTitle(e.target.value)} />
        <div>
            <label htmlFor="" className='mt-5'>Start Date</label>
            <Datetime value={start} onChange={date => setStart(date)}/>
        </div>
        <div>
            <label htmlFor="" className='mt-2'>End Date</label>
            <Datetime value={end} onChange={date => setEnd(date)}/>
        </div>
        <div>
            <label htmlFor="color" className='mt-2'>Category</label>
            <select name="color" id="" className='mt-2 form-control' value={color} onChange={e=> setColor(e.target.value)}>
                <option disabled value="null">Select an Option</option>
                <option value={categoryColor.Food}>Food</option>
                <option value={categoryColor.Hotel}>Hotel</option>
                <option value={categoryColor.Attraction}>Attraction</option>
            </select>
        </div>
        <button className='btn btn-primary mt-2'>Add Event</button>
        </form>
    </Modal>
    </div>
    
  )
}

export default AddEventModal