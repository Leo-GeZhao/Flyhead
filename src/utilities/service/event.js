//Return Date-Time
export const eventDate = (data) => {
  const date = new Date(data).toDateString();
  const time = new Date(data).toLocaleTimeString();

  if (time[0] === "1") {
    return `${date.substring(4, 10)} - ${date.substring(
      0,
      4
    )} - ${time.substring(0, 5)} ${time.substring(9, 11)}`;
  } else {
    return `${date.substring(4, 10)} - ${date.substring(
      0,
      4
    )} - ${time.substring(0, 4)} ${time.substring(8, 10)}`;
  }
};

//Return Emoji based on Event Category
export const eventEmoji = (data) => {
  const emoji = () => {
    if (data === "#95bb72") return "🍔";
    else if (data === "#da8ee7") return "🏠";
    else if (data === "#6699CC") return "🏖";
    else return "";
  };
  return emoji();
};
