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

export const getTimezoneTime = (value?: Parameters<typeof dayjs>[0]) =>
  dayjs(value).tz(getTimezone())

export const dateTimeFormatter = (value: string) => {
  if (!value) return ''
  return getTimezoneTime(value).format('DD.MM.YYYY HH:mm')
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

const dateTimeIntervalPartsRegex = /P|Y|M|DT|H|S/

export const dateTimeIntervalToHumanReadableString = (
  dateTimeIntervalString?: string
) => {
  if (!dateTimeIntervalString) return ''
  const split = dateTimeIntervalString.split(dateTimeIntervalPartsRegex)
  const YMDhms = split.slice(1, -1)
  const indexToLabel = ['g.', 'mēn.', 'd.', 'st.', 'min.', 'sek.']

  return YMDhms.map((x) => parseInt(x))
    .map((x, i) => (x === 0 ? '' : `${x} ${indexToLabel[i]}`))
    .filter((x) => x !== '')
    .join(', ')
}

