export function getDateStr(AddDayCount, dd = null) {
  dd = dd || new Date();
  dd.setDate(dd.getDate() + AddDayCount);// 获取AddDayCount天后的日期
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1;// 获取当前月份的日期
  var d = dd.getDate();
  y = y > 9 ? '' + y : '0' + y;
  m = m > 9 ? '' + m : '0' + m;
  d = d > 9 ? '' + d : '0' + d;
  return y + '-' + m + '-' + d;
}

export function getWeekStr(AddDayCount, dd = null) {
  dd = dd || new Date();
  const s = '日一二三四五六'.charAt(dd.getDay() + AddDayCount);
  return `星期${s}`;
}

export function getTimeStr(dd) {
  let h = dd.getHours();
  let hh = h + 2;
  h = h > 9 ? '' + h : '0' + h;
  hh = hh > 9 ? '' + hh : '0' + hh;
  return h + ':00-' + hh + ':00';
}

function checkTime() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  if (h > 16 || (h === 16 && m > 30)) {
    return false;
  }
  if (h <= 7 || (h === 7 && m < 30)) {
    return 8;
  }
  if (m < 30) {
    return h + 1;
  }
  if (m > 30) {
    return h + 2;
  }
}

export function checkSelectTime(day, sh) {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const s = Number(getDateStr(0).split('-').join(''));
  if (day > s) {
    return true;
  }
  if (sh === h && m > 30) {
    return false;
  }
  if (sh === h + 1 && m > 30) {
    return false;
  }
  if (sh < h) {
    return false;
  }
  return true;
}

export function getItems() {
  const items = [];
  let id = 0;
  const minHours = 8;
  const maxHours = 18;
  ['今天', '明天', '后天'].forEach((text, index) => {
    const dateStr = getDateStr(index);
    const weekStr = getWeekStr(index);
    const children = [];
    let startHours = minHours;
    if (text === '今天') {
      const checkResult = checkTime();
      if (!checkResult) {
        return;
      }
      startHours = checkResult;
    }
    for (let i = startHours; i + 2 <= maxHours; i += 2) {
      const ii = i + 2;
      const is = i > 9 ? '' + i : '0' + i;
      const iis = ii > 9 ? '' + ii : '0' + ii;
      children.push({
        text: `${i}:00-${ii}:00`, id: id++, dateStr, weekStr, timeStr: `${is}:00-${iis}:00`
      });
    }
    items.push({ text, children });
  });
  return items;
}
