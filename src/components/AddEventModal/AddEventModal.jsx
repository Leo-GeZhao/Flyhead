import React from 'react'
import { useState } from 'react'
import Modal from 'react-modal'
import Datetime from 'react-datetime'
import moment from 'moment'
import "react-datetime/css/react-datetime.css";
import './addEventModal.css'

const customStyles = {
    button: {
    color:'white'
    },
    content: {
    top: '45%',
    // right: 'auto',
    // bottom: 'auto',
    }
}

const AddEventModal = ({isOpen, onClose, onEventAdded}) => {

    const [title, setTitle] = useState("")
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())
    const [category, setCategory] = useState("Food")

    const onSubmit = (event) => {
        event.preventDefault();
        onEventAdded({
            title:title,
            start:moment(start).toDate(),
            end:moment(end).toDate()
        })
        onClose()
    }

  return (
    <div className=''>
        <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder='Add Event Title' value={title} onChange={e => setTitle(e.target.value)} />
        <div>
            <label htmlFor="" className='mt-2'>Start Date</label>
            <Datetime value={start} onChange={date => setStart(date)}/>
        </div>
        <div>
            <label htmlFor="" className='mt-2'>End Date</label>
            <Datetime value={end} onChange={date => setEnd(date)}/>
        </div>
        {/* <div>
            <label htmlFor="category" className='mt-2' value={category} onChange={e=> setCategory(e.target.value)}>Category</label>
            <select name="category" id="" className='mt-2 form-control'>
                <option value={"Food"}>Food</option>
                <option value={"Hotel"}>Hotel</option>
                <option value={"Attaction"}>Attaction</option>
            </select>
        </div> */}
        <button className='btn btn-primary mt-2'>Add Event</button>
        </form>
    </Modal>
    </div>
    
  )
}

export default AddEventModal