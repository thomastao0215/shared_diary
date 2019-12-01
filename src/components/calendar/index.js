import { getNowDate, getDateStr } from './utils';

Component({
  properties: {
    currentYear: {
      type: Number,
      value: new Date().getFullYear()
    },
    currentMonth: {
      type: Number,
      value: new Date().getMonth() + 1
    },
    selectDate: {
      type: String,
      value: '',
      observer(value) {
        const y = Number(value.slice(0, 4));
        const m = Number(value.slice(4, 6));
        const d = Number(value.slice(6, 8));
        this.setData({ y, m, d });
      }
    }
  },

  data: {
    y: 0,
    m: 0,
    d: 0,
    allArr: [],
    preMonthDateLen: 0,
    currentMonthDateLen: 0,
  },

  ready() {
    this.getAllArr();
    let today = getNowDate();
    const ty = Number(today.slice(0, 4));
    const tm = Number(today.slice(4, 6));
    const td = Number(today.slice(6, 8));
    this.setData({
      ty, tm, td
    });
  },

  methods: {
    getDateLen(year, month) {
      let actualMonth = month - 1;
      let timeDistance = +new Date(year, month) - +new Date(year, actualMonth);
      return timeDistance / (1000 * 60 * 60 * 24);
    },

    getFirstDateWeek(year, month) {
      return new Date(year, month - 1, 1).getDay();
    },

    preMonth(year, month) {
      if (month == 1) {
        return {
          year: --year,
          month: 12
        };
      }
      return {
        year,
        month: --month
      };
    },

    nextMonth(year, month) {
      if (month == 12) {
        return {
          year: ++year,
          month: 1
        };
      }
      return {
        year,
        month: ++month
      };
    },

    getCurrentArr() {
      let currentMonthDateLen = this.getDateLen(this.data.currentYear, this.data.currentMonth);
      let currentMonthDateArr = [];
      if (currentMonthDateLen > 0) {
        for (let i = 1; i <= currentMonthDateLen; i++) {
          currentMonthDateArr.push({
            month: 'current',
            date: i
          });
        }
      }
      this.setData({
        currentMonthDateLen
      });
      return currentMonthDateArr;
    },

    getPreArr() {
      let preMonthDateLen = this.getFirstDateWeek(this.data.currentYear, this.data.currentMonth);
      let preMonthDateArr = [];
      if (preMonthDateLen > 0) {
        let { year, month } = this.preMonth(this.data.currentYear, this.data.currentMonth);
        let date = this.getDateLen(year, month);
        for (let i = 0; i < preMonthDateLen; i++) {
          preMonthDateArr.unshift({
            month: 'pre',
            date
          });
          date--;
        }
      }
      this.setData({
        preMonthDateLen
      });
      return preMonthDateArr;
    },

    getNextArr() {
      let nextMonthDateLen = 42 - this.data.preMonthDateLen - this.data.currentMonthDateLen;
      let nextMonthDateArr = [];
      if (nextMonthDateLen > 0) {
        for (let i = 1; i <= nextMonthDateLen; i++) {
          nextMonthDateArr.push({
            month: 'next',
            date: i
          });
        }
      }
      return nextMonthDateArr;
    },

    getAllArr() {
      let preArr = this.getPreArr();
      let currentArr = this.getCurrentArr();
      preArr = preArr.map(() => '');
      // let nextArr = this.getNextArr()
      let allArr = [...preArr, ...currentArr];
      this.setData({ allArr });
    },

    gotoPreMonth() {
      const {
        currentYear, currentMonth, ty, tm
      } = this.data;
      if (ty > currentYear || (ty == currentYear && tm >= currentMonth)) {
        return;
      }
      let { year, month } = this.preMonth(currentYear, currentMonth);
      this.setData({
        currentYear: year,
        currentMonth: month
      });
      this.getAllArr();
    },

    gotoNextMonth() {
      let { year, month } = this.nextMonth(this.data.currentYear, this.data.currentMonth);
      this.setData({
        currentYear: year,
        currentMonth: month
      });
      this.getAllArr();
    },

    onClickItem(e) {
      const { day } = e.currentTarget.dataset;
      const { currentYear, currentMonth } = this.data;
      const s = getDateStr(currentYear, currentMonth, day);
      const { ty, tm, td } = this.data;
      if (ty > currentYear || (ty == currentYear && tm > currentMonth) || (ty == currentYear && tm == currentMonth && td > day)) {
        return;
      }
      this.triggerEvent('click', s);
    }
  }
});
