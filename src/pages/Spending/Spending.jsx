import React, { useEffect, useState } from "react";

//Components
import Header from "../../components/Header/Header";
import AddSpendingModal from "../../components/AddSpendingModal/AddSpendingModal";
import PieChart from "../../components/PieChart/PieChart";
import Footer from "../../components/Footer/Footer";

//Event API
import * as eventApi from "../../utilities/api/event";

//Service
import * as eventService from "../../utilities/service/event";
import * as spendingService from "../../utilities/service/spending";

import "./spending.css";

const Spending = ({ user }) => {
  const [month, setMonth] = useState(spendingService.getCurrentMonth);
  const [events, setEvents] = useState([]);
  const [expense, setExpense] = useState(null);
  const [totalExpense, setTotalExpense] = useState(null);
  const [foodExpense, setFoodExpense] = useState(null);
  const [hotelExpense, setHotelExpense] = useState(null);
  const [attractionExpense, setAttractionExpense] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalId, setModalId] = useState(null);

  console.log(month);

  useEffect(
    function () {
      async function getSpending() {
        //Get All Finished Events
        const finishEvent = await eventApi.getFinishedEvents({
          user: user._id,
        });

        //Get All Current Month Finiehde Events
        const curMonthEvents = spendingService.currentMonthEvent(
          finishEvent.data,
          month
        );
        setEvents(curMonthEvents);

        //Get Current Month Total Expense
        const totalExpense = spendingService.getExpense(curMonthEvents);
        setTotalExpense(totalExpense);

        //Get Current Month Food Expense
        const foodExpense = spendingService.getExpense(
          curMonthEvents,
          "#95bb72"
        );
        setFoodExpense(foodExpense);

        //Get Current Month Hotel Expense
        const hotelExpense = spendingService.getExpense(
          curMonthEvents,
          "#da8ee7"
        );
        setHotelExpense(hotelExpense);

        //Get Current Month Attraction Expense
        const attractionExpense = spendingService.getExpense(
          curMonthEvents,
          "#6699CC"
        );
        setAttractionExpense(attractionExpense);
      }
      getSpending();
    },
    [month, expense, totalExpense, foodExpense, hotelExpense, attractionExpense]
  );

  console.log(events);

  return (
    <>
      <Header />
      <main>
        <div className="mt-5 d-flex justify-content-center">
          <label htmlFor="month" className="mt-2">
            Month:{" "}
          </label>
          <select
            name="month"
            id=""
            className="form-control ms-3 month__select"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option disabled value="null">
              Select an Month
            </option>
            <option value={"01"}>January</option>
            <option value={"02"}>February</option>
            <option value={"03"}>March</option>
            <option value={"04"}>April</option>
            <option value={"05"}>May</option>
            <option value={"06"}>June</option>
            <option value={"07"}>July</option>
            <option value={"08"}>August</option>
            <option value={"09"}>September</option>
            <option value={"10"}>October</option>
            <option value={"11"}>November</option>
            <option value={"12"}>December</option>
          </select>
        </div>
        <div className="mt-4 d-flex justify-content-around">
          <div className="d-flex flex-column align-items-center">
            <div className="me-5">
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
          <div className="d-flex flex-column justify-content-center">
            <div>
              Total <span style={{ color: "#95bb72" }}>Food</span> Expense:{" "}
              {foodExpense}
            </div>
            <div>
              Total <span style={{ color: "#da8ee7" }}>Hotel</span> Expense:{" "}
              {hotelExpense}
            </div>
            <div>
              Total <span style={{ color: "#6699CC" }}>Attraction</span>{" "}
              Expense: {attractionExpense}
            </div>
          </div>
        </div>
        <div className="mt-5 container-fluid">
          <div className="row row-cols-4 justify-content-center">
            {events.map((event) => {
              return (
                <div className="mb-2 mx-2 row card">
                  <div className="card-body">
                    <h5
                      className="card-title mb-3"
                      style={{ color: event.color }}
                    >
                      {event.title} {eventService.eventEmoji(event.color)}
                    </h5>
                    <p className="card-text">
                      <strong>Start:</strong>{" "}
                      {eventService.eventDate(event.start)}
                    </p>
                    <p className="card-text">
                      <strong>End:</strong> {eventService.eventDate(event.end)}
                    </p>
                    <p>
                      <strong>Expense:</strong> {event.expense}
                    </p>
                    <button
                      onClick={() => {
                        setModalOpen(true);
                        setModalId(event._id);
                      }}
                      className="btn btn-blue"
                    >
                      Edit Expense
                    </button>
                    <AddSpendingModal
                      isOpen={modalOpen}
                      onClose={() => setModalOpen(false)}
                      modalId={modalId}
                      expense={expense}
                      setExpense={setExpense}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Spending;
