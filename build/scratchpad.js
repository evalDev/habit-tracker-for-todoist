'use strict';

// Javascript
var habitTracker = new Vue({
  el: '#habitTracker',
  data: {
    message: 'Hello Vue!',
    dateRange: null
  },
  methods: {
    generateDateRange: function generateDateRange(startingDate) {
      // check if arg undefedined and sets default date of today(-6 days)
      startingDate = startingDate || moment().startOf('date').subtract(6, 'd');

      // Returns array of 7 moment objects increase days by 1
      return new Array(7).fill(1).map(function (c, i) {
        return moment(startingDate).add(i, 'd').startOf('date');
      });
    },
    addXdays: function addXdays(number) {
      return this.dateRange = this.generateDateRange(this.dateRange[0].add(number, 'd'));
    },
    plusOneDay: function plusOneDay() {
      return this.addXdays(1);
    },
    minusOneDay: function minusOneDay() {
      return this.addXdays(-1);
    },
    plusOneWeek: function plusOneWeek() {
      return this.addXdays(7);
    },
    minusOneWeek: function minusOneWeek() {
      return this.addXdays(-7);
    }

  }
});

// Tests

describe('Habit Tracker', function () {
  describe('generateDateRange', function () {
    var gdr = void 0;
    beforeEach(function () {
      gdr = habitTracker.generateDateRange();
    });
    it('generates an array', function () {
      expect(Array.isArray(gdr)).toBe(true);
    });
    it('generates an array with 7 items', function () {
      expect(gdr.length).toBe(7);
    });
    it('generates a array that is not empty', function () {
      expect(Object.keys(gdr).length).toBeGreaterThan(0);
    });
    it('should return an array of moment(date) objects', function () {
      expect(gdr.every(function (date) {
        return date._isAMomentObject;
      })).toBe(true);
    });
    it('should have today\'s date as the last item in the array', function () {
      var lastDate = gdr.slice(-1)[0];
      expect(lastDate.startOf('date').format()).toBe(moment().startOf('date').format());
    });
    it('should have a that is 6 days prior to today as the first item in the array', function () {
      var firstDate = gdr.slice(0)[0];
      var sixDaysPriortoToday = moment().subtract(6, 'days').startOf('date').format();
      expect(firstDate.format()).toBe(sixDaysPriortoToday);
    });
    it('should return an array where each item is +1 day', function () {
      // checks date incremented by one day if false returns 0
      var checkIncrementedOneDay = gdr.reduce(function (previous, date) {
        if (previous === 0) {
          return 0;
        }
        return previous.add(1, 'd').format() === date.format() ? date : 0;
      });
      expect(checkIncrementedOneDay._isAMomentObject).toBe(true);
    });
    describe('args', function () {
      it('should accept a moment() as an argument', function () {
        expect(habitTracker.generateDateRange(moment())).not.toBe(undefined);
      });
      it('should set the moment to the first item of the array', function () {
        gdr = habitTracker.generateDateRange(moment());
        expect(gdr[0].format()).toBe(moment().startOf('date').format());
      });
    });
  });
  describe('plusOneDay', function () {
    it('should advance all of the date in dateRange by one day', function () {
      var date = moment('2018-01-01', 'YYYY-MM-DD');
      habitTracker.dateRange = habitTracker.generateDateRange(date);
      habitTracker.plusOneDay();
      var dateRange = habitTracker.dateRange;
      expect(dateRange[0].format()).toBe('2018-01-02T00:00:00+00:00');
      expect(dateRange[1].format()).toBe('2018-01-03T00:00:00+00:00');
      expect(dateRange[2].format()).toBe('2018-01-04T00:00:00+00:00');
      expect(dateRange[3].format()).toBe('2018-01-05T00:00:00+00:00');
      expect(dateRange[4].format()).toBe('2018-01-06T00:00:00+00:00');
      expect(dateRange[5].format()).toBe('2018-01-07T00:00:00+00:00');
      expect(dateRange[6].format()).toBe('2018-01-08T00:00:00+00:00');
    });
  });
  describe('minusOneDay', function () {
    it('should regress all of the date in dateRange by one day', function () {
      var date = moment('2018-01-01', 'YYYY-MM-DD');
      habitTracker.dateRange = habitTracker.generateDateRange(date);
      habitTracker.minusOneDay();
      var dateRange = habitTracker.dateRange;
      expect(dateRange[0].format()).toBe('2017-12-31T00:00:00+00:00');
      expect(dateRange[1].format()).toBe('2018-01-01T00:00:00+00:00');
      expect(dateRange[2].format()).toBe('2018-01-02T00:00:00+00:00');
      expect(dateRange[3].format()).toBe('2018-01-03T00:00:00+00:00');
      expect(dateRange[4].format()).toBe('2018-01-04T00:00:00+00:00');
      expect(dateRange[5].format()).toBe('2018-01-05T00:00:00+00:00');
      expect(dateRange[6].format()).toBe('2018-01-06T00:00:00+00:00');
    });
  });
  describe('plusOneWeek', function () {
    it('should advance all of the date in dateRange by one week', function () {
      var date = moment('2018-01-01', 'YYYY-MM-DD');
      habitTracker.dateRange = habitTracker.generateDateRange(date);
      habitTracker.plusOneWeek();
      var dateRange = habitTracker.dateRange;
      expect(dateRange[0].format()).toBe('2018-01-08T00:00:00+00:00');
      expect(dateRange[1].format()).toBe('2018-01-09T00:00:00+00:00');
      expect(dateRange[2].format()).toBe('2018-01-10T00:00:00+00:00');
      expect(dateRange[3].format()).toBe('2018-01-11T00:00:00+00:00');
      expect(dateRange[4].format()).toBe('2018-01-12T00:00:00+00:00');
      expect(dateRange[5].format()).toBe('2018-01-13T00:00:00+00:00');
      expect(dateRange[6].format()).toBe('2018-01-14T00:00:00+00:00');
    });
  });
  describe('minusOneWeek', function () {
    it('should regress all of the date in dateRange by one week', function () {
      var date = moment('2018-01-01', 'YYYY-MM-DD');
      habitTracker.dateRange = habitTracker.generateDateRange(date);
      habitTracker.minusOneWeek();
      var dateRange = habitTracker.dateRange;
      expect(dateRange[0].format()).toBe('2017-12-25T00:00:00+00:00');
      expect(dateRange[1].format()).toBe('2017-12-26T00:00:00+00:00');
      expect(dateRange[2].format()).toBe('2017-12-27T00:00:00+00:00');
      expect(dateRange[3].format()).toBe('2017-12-28T00:00:00+00:00');
      expect(dateRange[4].format()).toBe('2017-12-29T00:00:00+00:00');
      expect(dateRange[5].format()).toBe('2017-12-30T00:00:00+00:00');
      expect(dateRange[6].format()).toBe('2017-12-31T00:00:00+00:00');
    });
  });
});