export const set = (key: string, value: string) =>
  localStorage.setItem(key, value)

export const get = (key: string) => localStorage.getItem(key)
