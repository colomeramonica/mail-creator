export function excelSerialDateToDate(serialDate: number) {
  // Excel's epoch starts on December 31, 1899
  const excelEpoch = new Date(Date.UTC(1899, 11, 31));
  // Excel incorrectly treats 1900 as a leap year, so subtract 1 from the serial date for dates after February 28, 1900
  const adjustedSerialDate = serialDate > 59 ? serialDate - 1 : serialDate;
  // Calculate the correct date accounting for Excel's leap year bug
  const resultDate = new Date(
    excelEpoch.getTime() + adjustedSerialDate * 86400000,
  );

  // Adjust for the timezone offset
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
