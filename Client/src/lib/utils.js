import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { convert } from 'html-to-text'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function toPlainText({ type = 'html', value }) {
  switch (type) {
    case 'html':
      const text = convert(value, { wordwrap: 130 })
      return text
    default:
      break
  }
}

export function dateToString({ type, values }) {
  let results
  const date = new Date(values)
  switch (type) {
    case 'yyy-mm-dd':
      const converting = date.toLocaleDateString('zh-Hans-CN')
      results = converting
      break

    default:
      const defaultConverting = date.toLocaleDateString('default')
      results = defaultConverting
      break
  }

  return results
}

export function slug(value) {
  if (!value) {
    return value
  }
  const results = value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return results
}

export function isExistArray(array, key, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      return true
    }
  }
  return false
}
