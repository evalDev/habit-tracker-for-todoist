// Javascript
var habitTracker = new Vue({
  el: '#habitTracker',
  data: {
    message: 'Hello Vue!'
  },
  methods: {
    generateDateRange: () => new Array(7)
  }
})

// Tests

describe('Habit Tracker', () => {
  describe('generateDateRange', () => {
    it('generates an array', () => {
      expect(Array.isArray(habitTracker.generateDateRange())).toBe(true)
    })
    it('generates an array with 7 items', () => {
      expect(habitTracker.generateDateRange().length).toBe(7)
    })
  })
})
