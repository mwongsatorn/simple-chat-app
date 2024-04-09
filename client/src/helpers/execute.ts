export function throttle(fn: Function, delay = 1000): (...args: any[]) => void {
  let isProgress: boolean = false

  return function (...args) {
    if (isProgress) return
    isProgress = true
    fn(...args)
    setTimeout(() => {
      isProgress = false
    }, delay)
  }
}

export function debounce(fn: Function, delay = 1000): (...args: any[]) => void {
  let timeout: number

  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
