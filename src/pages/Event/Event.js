import React from 'react'
import { useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import { formatDate } from '@fullcalendar/core';


const Event = () => {
    
    const [currentEvents, setCurrentEvents] = useState([])

    const handleDateClick = (selected) => {
        const title = prompt("Please enter your event")
        const calendarApi = selected.view.calendar;
        calendarApi.unselect();

        if(title) {
            calendarApi.addEvent({
                id: `${selected.dateStr} - ${title}`,
                title,
                start:selected.startStr,
                end:selected.endStr,
                allDay:selected.allDay,
            })
        }
    }


    const handleEventClick = (selected) => {
        if(
            window.confirm (`Are you sure you want to delete the event '${selected.event.title}'`
            ))
            selected.event.remove()
    }

  return (
    <div className='d-flex justify-content-around align-items-center mt-5'> 
        <div>  
            <h1>Event</h1>
            <h5>Full Calender Page</h5>
            <div>
                    {currentEvents.map((event) =>  (
                        <ul key={event.id}>
                            <li>{event.title}</li>
                            <li>{formatDate(event.start, {
                                year:"numeric",
                                month:"short",
                                day:"numeric"
                            })}</li>
                        </ul>
                    )
                    )}
            </div>
        </div>
        <div>
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
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
              {
                id: "12315",
                title: "All-day event",
                date: "2022-12-14",
              },
              {
                id: "5123",
                title: "Timed event",
                date: "2022-12-28",
              },
            ]}
            />
        </div>
    </div>
  )
}

export default Event