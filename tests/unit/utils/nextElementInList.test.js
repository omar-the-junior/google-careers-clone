import nextElementInlist from '../../../src/utils/nextElementInList'

describe('nextElementInList', () => {
  it('locates element in list and return the next element in the list', () => {
    const list = ['A', 'B', 'C', 'D', 'E']
    const value = 'C'
    const result = nextElementInlist(list, value)
    expect(result).toBe('D')
  })

  describe('when the value is the last element in the list', () => {
    it('returns the first element in the list', () => {
      const list = ['A', 'B', 'C', 'D', 'E']
      const value = 'E'
      const result = nextElementInlist(
        list,
        value
      )
      expect(result).toBe('A')
    })
  })
})
