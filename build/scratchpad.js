'use strict';

// Javascript
var habitTracker = new Vue({
  el: '#habitTracker',
  data: {
    message: 'Hello Vue!'
  },
  methods: {
    generateDateRange: function generateDateRange() {
      return new Array(7);
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
  });
});