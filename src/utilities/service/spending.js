//Get Current Month
export const getCurrentMonth = () => {
  const month = String(new Date().getMonth() + 1);

  if (month[1]) {
    return month;
  } else {
    return `0${month}`;
  }
};

//Filter Current Month Events
export const currentMonthEvent = (events, month) => {
  const currMonth = events.filter((e) => e.start.substring(5, 7) === month);
  return currMonth;
};

//Filter and Calculate Monthly Spending Based on Event Category
export const getExpense = (events, category) => {
  const expense = (events) => {
    return events.map((event) => event.expense).reduce((a, b) => a + b, 0);
  };
  if (category) {
    return expense(events.filter((e) => e.color === category));
  } else {
    return expense(events);
  }
};
