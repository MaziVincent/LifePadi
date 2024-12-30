const DateFormater = (dateTime) => {
  dateTime = new Date(dateTime)
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const monthsOfYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const day = daysOfWeek[dateTime.getDay()]
  const month = monthsOfYear[dateTime.getMonth()]
  const date = dateTime.getDate()
  const year = dateTime.getFullYear()
  let hours = dateTime.getHours()
  const minutes = dateTime.getMinutes().toString().padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'

  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'

  return `${day}, ${month} ${date}, ${year} ${hours}:${minutes} ${ampm}`
}

export default DateFormater
