import FileSaver from 'file-saver'
import { surpriseMePrompts } from '../constants'

export function getRandomPrompt(prompt) {
  let randomPrompt = prompt
  while (randomPrompt === prompt) {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
    randomPrompt = surpriseMePrompts[randomIndex]
  }

  return randomPrompt
}

export async function downloadImage(_id, photo, type="b64") {
  if (type == "b64") {
    photo = "data:image/jpeg;base64," + photo
  }
  FileSaver.saveAs(photo, `download-${_id}.jpg`)
}
