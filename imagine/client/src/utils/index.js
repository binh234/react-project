import FileSaver from 'file-saver'
import { surpriseMePrompts } from '../constants'

export function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

export function getRandomPrompt(prompt) {
  let randomPrompt = prompt
  while (randomPrompt === prompt) {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
    randomPrompt = surpriseMePrompts[randomIndex]
  }

  return randomPrompt
}

export async function downloadImage(_id, photo, type = 'b64') {
  if (type == 'b64') {
    photo = 'data:image/jpeg;base64,' + photo
  }
  FileSaver.saveAs(photo, `download-${_id}.jpg`)
}

export default async function fetcher(...args) {
  const res = await fetch(...args)
  return res.json()
}

export function isValidTag(value) {
  return /^[a-z ]{4,12}$/i.test(value)
}
