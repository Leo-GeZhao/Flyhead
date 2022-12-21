import React from 'react'
import { useState, useRef} from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import AddEventModal from '../../components/AddEventModal/AddEventModal';
import * as eventApi from '../../utilities/api/event'
import './event.css'





const Event = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [events, setEvents] = useState([])
    const calendarRef = useRef(null)

    const onEventAdded = event => {
        const calendarApi = calendarRef.current.getApi()
        calendarApi.addEvent(event)
    }

    const handleEventAdd = (data) => {
        eventApi.createEvent(data.event)
    }

    const handleDatesSet = async () => {
        const eventsData = await eventApi.getEvents()
        setEvents(eventsData.data)
    }

    


  return (
    <div className='d-flex justify-content-around mt-5'> 
        <div>  
            <h1>Event</h1>
            <h5>Full Calender Page</h5>
            <button onClick={()=> setModalOpen(true)} className="btn btn-primary">Add a New Event</button>
            <AddEventModal 
            isOpen={modalOpen}
            onClose={()=> setModalOpen(false)}
            onEventAdded={event => onEventAdded(event)}
            />
        </div>
        <div className="fullCalender">
            <FullCalendar
            height="75vh"
            plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
            ]}
            headerToolbar={{
                left:"prev,next today",
                center:"title",
                right:"dayGridMonth,timeGridWeek,timeGridDay,listMonth"
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            ref={calendarRef}
            eventAdd={(event)=> handleEventAdd(event)}
            datesSet={(date)=> handleDatesSet(date)}
            events={events}
            />
        </div>
    </div>
  )
}

export default Event