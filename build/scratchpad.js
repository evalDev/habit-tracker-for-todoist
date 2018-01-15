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
    it('generates an array', function () {
      expect(Array.isArray(habitTracker.generateDateRange())).toBe(true);
    });
    it('generates an array with 7 items', function () {
      expect(habitTracker.generateDateRange().length).toBe(7);
    });
  });
});