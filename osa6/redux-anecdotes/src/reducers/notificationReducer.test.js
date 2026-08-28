import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import notificationReducer, {
  clearNotification,
  setNotification,
  showNotification,
} from './notificationReducer'

describe('notificationReducer', () => {
  test('a notification can be shown and cleared', () => {
    expect(notificationReducer(null, showNotification('hello'))).toBe('hello')
    expect(notificationReducer('hello', clearNotification())).toBe(null)
  })

  describe('setNotification', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    test('shows the notification and clears it after the given time', () => {
      const dispatch = vi.fn()

      setNotification('voted', 5)(dispatch)
      expect(dispatch).toHaveBeenCalledWith(showNotification('voted'))

      vi.advanceTimersByTime(4999)
      expect(dispatch).toHaveBeenCalledTimes(1)

      vi.advanceTimersByTime(1)
      expect(dispatch).toHaveBeenCalledWith(clearNotification())
    })

    test('a later notification resets the pending timeout', () => {
      const dispatch = vi.fn()

      setNotification('first', 5)(dispatch)
      vi.advanceTimersByTime(4000)
      setNotification('second', 5)(dispatch)
      vi.advanceTimersByTime(4000)

      expect(dispatch).not.toHaveBeenCalledWith(clearNotification())

      vi.advanceTimersByTime(1000)
      expect(dispatch).toHaveBeenCalledWith(clearNotification())
    })
  })
})
