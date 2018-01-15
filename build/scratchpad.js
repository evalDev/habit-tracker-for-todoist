'use strict';

// Javascript
var habitTracker = new Vue({
  el: '#habitTracker',
  data: {
    message: 'Hello Vue!'
  },
  methods: {
    generateDateRange: function generateDateRange() {
      return new Array(7).fill(moment());
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
  });
});