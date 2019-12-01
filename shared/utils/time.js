/* eslint-disable */
var weekdaysArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

function newDate(dateExpr) {
  if (Object.prototype.toString.call(dateExpr) == '[object String]') {
    return new Date(dateExpr.replace(/-/g, '/'));
  }
  return new Date(dateExpr);
}

function isToday(date) {
  var now = new Date();
  var dateObj = newDate(date);
  return now.getFullYear() == dateObj.getFullYear() && now.getMonth() == dateObj.getMonth() && now.getDate() == dateObj.getDate();
}

function getMinuteHHmm(hourMinute) {
  var hm = hourMinute.split(':');
  return parseInt(hm[0], 10) * 60 + parseInt(hm[1], 10);
}

function getMinuteDate(date) {
  return date.getHours() * 60 + date.getMinutes();
}

function getTimeUnitInMS(timeUnit) {
  if (!timeUnit || !timeUnit.type) {
    return 0;
  }
  if (timeUnit.type == 'none') {
    return 0;
  } else if (timeUnit.type == 'minute') {
    return parseInt(timeUnit.value, 10) * 60 * 1000;
  } else if (timeUnit.type == 'hour') {
    return parseInt(timeUnit.value, 10) * 60 * 60 * 1000;
  } else if (timeUnit.type == 'day') {
    var nowDate = new Date();
    var end = setHourMinSec0(nowDate);
    end.setDate(end.getDate() + parseInt(timeUnit.value, 10));

    return end.getTime() - nowDate.getTime();
  }
  return 0;
}

function getDateStr(date) {
  if (!date) {
    return '';
  }
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

function getDateStrFix2(date) {
  if (!date) {
    return '';
  }
  return date.getFullYear() + '-' + fix2(date.getMonth() + 1) + '-' + fix2(date.getDate());
}

function formatDateTime(date) {
  return getDateStr(date) + ' ' + getTimeFix2Str(date);
}

function formatDateTimeFix2(date) {
  if (!date) {
    return '';
  }
  return getDateStrFix2(date) + ' ' + getTimeFix2Str(date) + ':00';
}

function getTimeFix2Str(date) {
  return fix2(date.getHours()) + ':' + fix2(date.getMinutes());
}

function createTimeStrFix2FromHourMinute(hour, minute) {
  return fix2(hour) + ':' + fix2(minute);
}

function fix2(value) {
  return value < 10 ? '0' + value : value;
}

function compareTime(currTime, targetTime) {
  if (currTime === targetTime) {
    return 0;
  }
  var startPoint = getMinuteHHmm(currTime);
  var endPoint = getMinuteHHmm(targetTime);
  return startPoint - endPoint;
}

function computeTimePiecesCount(startTime, endTime, timespan) {
  var startPoint = getMinuteHHmm(startTime);
  var endPoint = getMinuteHHmm(endTime);
  var allMinutes = endPoint - startPoint;
  return Math.ceil(allMinutes / timespan);
}

function generateNextSlotStart(closeTime, currHour, currMinute, timespan) {
  var closePoint = getMinuteHHmm(closeTime);

  var currentPoint = currHour * 60 + currMinute;

  var nextPoint = currentPoint + timespan;

  if (nextPoint > closePoint) {
    nextPoint = closePoint;
  }
  return {
    hour: Math.floor(nextPoint / 60),
    minute: nextPoint % 60
  };
}

function isTheSameDay(datetime1, datetime2) {
  return compareDay(datetime1, datetime2) == 0;
}

function computeDayCount(startDate, endDate) {
  var startTime = setHourMinSec0(startDate);
  var endTime = setHourMinSec0(endDate);
  return Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60 * 24)) + 1;
}

function compareDay(startDate, endDate) {
  var startTime = setHourMinSec0(startDate);
  var endTime = setHourMinSec0(endDate);
  return startTime.getTime() - endTime.getTime();
}

function setHourMinSec0(date) {
  var dateReturn = newDate(date);
  dateReturn.setHours(0);
  dateReturn.setMinutes(0);
  dateReturn.setSeconds(0);
  dateReturn.setMilliseconds(0);
  return dateReturn;
}

function getMonthDayfix2Str(date) {
  var month = date.getMonth() + 1;
  month = month.toString().length === 1 ? '0' + month : month;
  var day = date.getDate();
  day = day.toString().length === 1 ? '0' + day : day;
  return month + '月' + day + '日';
}

function getMonthInterval(start, end) {
  var startDate = newDate(start);
  var endDate = newDate(end);
  return (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()) + 1;
}

function getDateDescription(date) {
  var today = new Date();
  var tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  var afterTomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);
  var dateStr = getDateStr(date);
  if (dateStr === getDateStr(today)) {
    return '今天';
  } else if (dateStr === getDateStr(tomorrow)) {
    return '明天';
  } else if (dateStr === getDateStr(afterTomorrow)) {
    return '后天';
  }

  return weekdaysArr[date.getDay()];
}

function format(date, fmt) {
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds() };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return fmt;
}

export { isToday, formatDateTime, formatDateTimeFix2, newDate, getMinuteHHmm, getMinuteDate, getTimeUnitInMS, getDateStr, getDateStrFix2, getTimeFix2Str, createTimeStrFix2FromHourMinute, compareTime, computeTimePiecesCount, generateNextSlotStart, isTheSameDay, computeDayCount, compareDay, setHourMinSec0, getMonthDayfix2Str, getMonthInterval, getDateDescription, format };