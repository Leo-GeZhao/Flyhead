import React from 'react'
import { useState } from 'react'
import Modal from 'react-modal'
import Datetime from 'react-datetime'
import moment from 'moment'
import "react-datetime/css/react-datetime.css";
import './addEventModal.css'

const customStyles = {
    content: {
    top: '45%',
    borderRadius:"1rem",
    padding:'2rem 1rem'
    }
}

const AddEventModal = ({isOpen, onClose, onEventAdded}) => {

    const [title, setTitle] = useState("")
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())
    const [color, setColor] = useState("#f9ddb1")


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
        <form onSubmit={onSubmit}>
            <input type="text" className='form-control' placeholder='Add Event Title' value={title} onChange={e => setTitle(e.target.value)} />
        <div>
            <label htmlFor="" className='mt-2'>Start Date</label>
            <Datetime value={start} onChange={date => setStart(date)}/>
        </div>
        <div>
            <label htmlFor="" className='mt-2'>End Date</label>
            <Datetime value={end} onChange={date => setEnd(date)}/>
        </div>
        <div>
            <label htmlFor="color" className='mt-2'>Category</label>
            <select name="color" id="" className='mt-2 form-control' value={color} onChange={e=> setColor(e.target.value)}>
                <option value={"#95bb72"}>Food</option>
                <option value={"#da8ee7"}>Hotel</option>
                <option value={"#6699CC"}>Attraction</option>
            </select>
        </div>
        <button className='btn btn-primary mt-2'>Add Event</button>
        </form>
    </Modal>
    </div>
    
  )
}

export default AddEventModal