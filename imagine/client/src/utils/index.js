import { surpriseMePrompts } from '../constants'

export function getRandomPrompt(prompt) {
  let randomPrompt = prompt
  while (randomPrompt === prompt) {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
    randomPrompt = surpriseMePrompts[randomIndex]
  }

  return randomPrompt
}
