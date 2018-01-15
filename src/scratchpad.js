// Javascript
var habitTracker = new Vue({
  el: '#habitTracker',
  data: {
    message: 'Hello Vue!'
  },
  methods: {
    generateDateRange: () => new Array(7).fill(moment())
  }
})

// Tests

describe('Habit Tracker', () => {
  describe('generateDateRange', () => {
    let gdr
    beforeEach(() => {
      gdr = habitTracker.generateDateRange()
    })
    it('generates an array', () => {
      expect(Array.isArray(gdr)).toBe(true)
    })
    it('generates an array with 7 items', () => {
      expect(gdr.length).toBe(7)
    })
    it('generates a array that is not empty', () => {
      expect(Object.keys(gdr).length).toBeGreaterThan(0)
    })
    it('should return an array of moment(date) objects', () => {
      expect(gdr.every(date => date._isAMomentObject)).toBe(true)
    })
    xit('generates the last date in array as today\'s date', () => {
      const today = moment().format('YYYY-MM-DD')
      const todayWithoutTime = moment()
      expect(gdr.slice(-1)[0]).toBe()
    })
  })
})
