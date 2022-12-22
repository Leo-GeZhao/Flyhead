import React from 'react'
import { useState, useRef} from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import AddEventModal from '../../components/AddEventModal/AddEventModal';
import Header from '../../components/Header/Header';
import * as eventApi from '../../utilities/api/event'
import moment from 'moment'
import './event.css'




const Event = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [events, setEvents] = useState([])
    const calendarRef = useRef(null)

    const onEventAdded = event => {
        console.log(event)
        const calendarApi = calendarRef.current.getApi()
        calendarApi.addEvent({
            title:event.title,
            start:moment(event.start).toDate(),
            end:moment(event.end).toDate(),
            backgroundColor:event.color,
        })
    }

    const handleEventAdd = (data) => {
        console.log(data.event)
        eventApi.createEvent(data.event)
    }

    const handleDatesSet = async () => {
        const eventsData = await eventApi.getEvents()
        setEvents(eventsData.data)
    }

    console.log(events)


  return (
    <>
    <Header/>
    <div className='d-flex justify-content-around mt-5'> 
        <div className='d-flex flex-column justify-content-center'>  
            <h1 className='text-center'>Event</h1>
            <button onClick={()=> setModalOpen(true)} className="btn btn-primary">Add a New Event</button>
            <AddEventModal 
            isOpen={modalOpen}
            onClose={()=> setModalOpen(false)}
            onEventAdded={event => onEventAdded(event)}
            />
            <div className='mt-5'>
                {events.map((event)=> {
                    const start = new Date(event.start)
                    const end = new Date(event.end)
                    return (
                    <div className='card mb-2'>
                        <div className='card-body'> 
                            <h5 className='card-title mb-3'>{event.title}</h5>
                            <p className='card-text'>Start: {start.toDateString().substring(4,10)} - {start.toLocaleTimeString().substring(0,4)} {start.toLocaleTimeString().substring(8,10)}</p>
                            <p className='card-text'>End: {end.toDateString().substring(4,10)} - {end.toLocaleTimeString().substring(0,4)} {end.toLocaleTimeString().substring(8,10)}</p>
                        </div>
                    </div>
                )})}
            </div>
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
    </>
  )
}

export default Event