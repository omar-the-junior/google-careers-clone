import usePreviousAndNextPages from '@/composables/usePreviousAndNextPages'
import { ref } from 'vue'

describe('usePreviousAndNextPages', () => {
  it('calculates page before current one', () => {
    const currentPage = ref(8)
    const maxPage = ref(10)
    const { previousPage } = usePreviousAndNextPages(
      currentPage,
      maxPage
    )

    expect(previousPage.value).toBe(7)
  })
  describe('when current page is the first page', () => {
    it('does not provide previous page', () => {
      const currentPage = ref(1)
      const maxPage = ref(10)
      const { previousPage } = usePreviousAndNextPages(
        currentPage,
        maxPage
      )

      expect(previousPage.value).toBeUndefined()
    })
  })

  it('caluclates page after current one', () => {
    const currentPage = ref(8)
    const maxPage = ref(10)
    const { nextPage } = usePreviousAndNextPages(currentPage, maxPage)

    expect(nextPage.value).toBe(9)
  })

  describe('When current page is the last page', () => {
    it('does not provide next page', () => {
      const currentPage = ref(10)
      const maxPage = ref(10)
      const { nextPage } = usePreviousAndNextPages(
        currentPage,
        maxPage
      )
      expect(nextPage.value).toBeUndefined()
    })
  })
})
