import dayjs from 'dayjs'

const FALLBACK_TIMEZONE = 'Europe/Riga'

let tz: string

const getTimezone = () => {
  if (!tz) {
    if (import.meta.env.VITE_TIMEZONE) {
      tz = import.meta.env.VITE_TIMEZONE
    } else {
      console.error(
        '"import.meta.env.VITE_TIMEZONE" should be a string referencing a timezone, instead got ',
        import.meta.env.VITE_TIMEZONE
      )
      tz = FALLBACK_TIMEZONE
    }
  }

  return tz
}

export const getTimezoneTime = (value?: string) =>
  dayjs(value).tz(getTimezone())

export const dateTimeFormatter = (value: string) => {
  if (!value) return ''
  return getTimezoneTime(value).format('DD.MM.YYYY HH:mm:ss')
}

export const dateFormatter = (value: string) => {
  if (!value) return ''
  return getTimezoneTime(value).format('DD.MM.YYYY')
}

export const daysAgoFormatter = (lastChangesDate: string) => {
  if (getTimezoneTime(lastChangesDate).isToday()) return 'Šodien'
  if (getTimezoneTime(lastChangesDate).isYesterday()) return 'Vakar'

  return getTimezoneTime().diff(getTimezoneTime(lastChangesDate), 'day')
}

export const hoursMinutesStringToDateTimeInterval = (
  hoursMinutesString?: string | null
): string | null => {
  if (!hoursMinutesString) return null
  const [hours, minutes] = hoursMinutesString.split(':')
  return `PT${hours}H${minutes}M`
}

export const dateTimeIntervalToHoursMinutesString = (
  dateTimeIntervalString: string
) => {
  if (!dateTimeIntervalString) return ''
  const split = dateTimeIntervalString.split(/P|Y|M|DT|H|S/)
  const [hours, minutes] = split.slice(4, -2)

  return `${hours}:${minutes.padStart(2, '0')}`
}

export const formatHoursMinutesTime = (hoursMinutesString: string) => {
  const [hours, minutes] = hoursMinutesString.split(':')
  return [hours, minutes].join(':')
}

export const formatHoursMinutesTimeInterval = (hoursMinutesString: string) => {
  if (!hoursMinutesString) return ''
  const [hours, minutes] = hoursMinutesString.split(':')
  return parseInt(hours) === 0
    ? `${parseInt(minutes)}m`
    : `${parseInt(hours)}h ${parseInt(minutes)}m`
}

// const indexToLabel = [
//   { singular: 'gads', plural: 'gadi' },
//   { singular: 'mēn.', plural: 'mēneši' },
//   { singular: 'diena', plural: 'dienas' },
//   { singular: 'stunda', plural: 'stundas' },
//   { singular: 'minūte', plural: 'minūtes' },
//   { singular: 'sekunde', plural: 'sekundes' },
// ]

export const dateTimeIntervalToHumanReadableString = (
  dateTimeIntervalString?: string
) => {
  if (!dateTimeIntervalString) return ''
  const split = dateTimeIntervalString.split(/P|Y|M|DT|H|S/)
  const YMDhms = split.slice(1, -1)
  const indexToLabel = ['g.', 'mēn.', 'd.', 'st.', 'min.', 'sek.']

  return YMDhms.map((x) => parseInt(x))
    .map((x, i) => (x === 0 ? '' : `${x} ${indexToLabel[i]}`))
    .filter((x) => x !== '')
    .join(', ')
}
