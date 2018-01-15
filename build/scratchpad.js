'use strict';

// Javascript
var habitTracker = new Vue({
  el: '#habitTracker',
  data: {
    message: 'Hello Vue!'
  },
  methods: {
    generateDateRange: function generateDateRange() {
      // Returns array of 7 moment objects
      return new Array(7).fill(1).map(function (el, index) {
        return moment().subtract(7 - (index + 1), 'd') // Calcultes today minus place in array i.e arr[1] = today - 5 days
        .startOf('date'); // Sets Date and time to midnight and 0s
      });
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
    });
  });
});