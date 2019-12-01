export function getNowDate() {
  var date = new Date();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = '0' + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate;
  }
  var currentdate = date.getFullYear() + month + strDate;
  return currentdate;
}

export function getDateStr(year, month, day) {
  const y = year > 9 ? '' + year : '0' + year;
  const m = month > 9 ? '' + month : '0' + month;
  const d = day > 9 ? '' + day : '0' + day;
  return y + m + d;
}
