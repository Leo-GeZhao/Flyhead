/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import moment from "moment";

//Full Calender
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

//Components
import AddEventModal from "../../components/AddEventModal/AddEventModal";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

//Event API
import * as eventApi from "../../utilities/api/event";

//Event Service
import * as eventService from "../../utilities/service/event";

import "./event.css";

const Event = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [listEvents, setListEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [finish, setFinish] = useState(false);
  const calendarRef = useRef(null);

  //Support Full Calender Duplicate events
  const reload = () => {
    window.location.reload();
  };

  //Get Unfinished Events
  useEffect(
    function () {
      async function getUnfinishEvents() {
        const eventsData = await eventApi.getEvents({ user: user._id });

        //Filter unfinished events
        const unfinishEvent = eventsData.data.filter(
          (events) => events.isFinish === false
        );

        setListEvents(unfinishEvent);
        setFinish(false);
      }
      getUnfinishEvents();
    },
    [finish]
  );

  //Create Event on Full Calendar
  const onEventAdded = (event) => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent({
      title: event.title,
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      backgroundColor: event.color,
      user: user._id,
    });
  };

  //Create Event on Back-end
  const handleEventAdd = async (data) => {
    const event = await eventApi.createEvent(data.event);
    setListEvents([...events, event.data]);
    setEvents([...events, event.data]);
    reload();
  };

  //Delete Event
  const handleEventDelete = (event) => {
    const id = event.target.value;
    eventApi.deleteEvent(id);
    const updatedEvent = events.filter((events) => events._id !== id);
    setEvents(updatedEvent);
    setFinish(true);
  };

  //Set Event to Finished Event
  const handleEventFinish = (event) => {
    const id = event.target.value;
    eventApi.finishEvent(id);
    setFinish(true);
  };

  //Capture All finished and unfinished events to Full Calendar
  const handleDatesSet = async () => {
    const eventsData = await eventApi.getEvents({ user: user._id });
    setEvents(eventsData.data);
  };

  return (
    <>
      <Header />
      <main className="event">
        <div className="d-flex justify-content-around mt-5">
          <div className="d-flex flex-column justify-content-center">
            <h1 className="text-center">All Events</h1>
            <button onClick={() => setModalOpen(true)} className="btn btn-blue">
              Add a New Event
            </button>
            <AddEventModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              onEventAdded={(event) => onEventAdded(event)}
            />
            <div className="mt-3">
              {listEvents?.map((event) => {
                return (
                  <div className="card mb-2">
                    <div className="card-body">
                      <h5
                        className="card-title mb-3"
                        style={{ color: event.color }}
                      >
                        {event.title}{" "}
                        <span>{eventService.eventEmoji(event.color)}</span>
                      </h5>
                      <p className="card-text">
                        <strong>Start:</strong>{" "}
                        {eventService.eventDate(event.start)}
                      </p>
                      <p className="card-text">
                        <strong>End:</strong>{" "}
                        {eventService.eventDate(event.end)}
                      </p>
                      <div className="btn-group">
                        <button
                          className="btn btn-success delete__btn"
                          value={event._id}
                          onClick={(event) => handleEventFinish(event)}
                        >
                          Finish
                        </button>
                        <button
                          className="btn btn-danger delete__btn ms-1"
                          value={event._id}
                          onClick={(event) => handleEventDelete(event)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
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
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              ref={calendarRef}
              events={events}
              datesSet={() => handleDatesSet()}
              eventAdd={(event) => {
                handleEventAdd(event);
              }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Event;
