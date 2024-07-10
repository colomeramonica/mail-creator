export function excelSerialDateToDate(serialDate: number) {
  const excelEpoch = new Date(Date.UTC(1899, 11, 31));
  const adjustedSerialDate = serialDate > 59 ? serialDate - 1 : serialDate;
  const resultDate = new Date(
    excelEpoch.getTime() + adjustedSerialDate * 86400000,
  );

  const timeZoneOffset = resultDate.getTimezoneOffset() * 60000;

  return new Date(resultDate.getTime() - timeZoneOffset);
}

export function formatDate(dateString: Date) {
  const date = new Date(dateString);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate() + 1;
  const monthIndex = date.getMonth();
  const monthName = monthNames[monthIndex];

  function getDaySuffix(day: number) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  return `${monthName} ${day}${getDaySuffix(day)}`;
}
