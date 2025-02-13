import dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear' // import plugin
import relativeTime from 'dayjs/plugin/relativeTime'
import durationPlug from 'dayjs/plugin/duration'
import 'dayjs/locale/zh-cn' // import locale

dayjs.extend(isLeapYear) // use plugin
dayjs.extend(relativeTime)
dayjs.extend(durationPlug)
dayjs.locale('zh-cn') // use locale

export const dateFormat = (date, template = 'YYYY-MM-DD') => {
  if (!date) return ''
  return dayjs(date).format(template)
}

export const dateDuration = (time, unit = 'milliseconds') => {
  const ctx = dayjs.duration(time, unit)
  const { $d: ret } = ctx
  return {
    ctx,
    ...ret,
  }
}

export const dateFromNow = (date, withoutSuffix = false) => {
  return dayjs(date).fromNow(withoutSuffix)
}

export default dayjs
