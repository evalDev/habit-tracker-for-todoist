// Javascript
var habitTracker = new Vue({
  el: '#habitTracker',
  data: {
    message: 'Hello Vue!'
  },
  methods: {
    generateDateRange: () => []
  }
})

// Tests

describe('Habit Tracker', () => {
  describe('generateDateRange', () => {
    it('generates an array', () => {
      expect(Array.isArray(habitTracker.generateDateRange())).toBe(true)
    })
  })
})
