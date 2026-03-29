import { lesson1 } from './lesson1-io'
import { lesson2 } from './lesson2-variables'
import { lesson3 } from './lesson3-conditionals'
import { lesson4 } from './lesson4-loops'
import { lesson5 } from './lesson5-functions'
import { lesson6 } from './lesson6-files'
import type { LessonData } from './types'

export const lessons: LessonData[] = [lesson1, lesson2, lesson3, lesson4, lesson5, lesson6]

export function getLessonById(id: number): LessonData | undefined {
  return lessons.find(l => l.id === id)
}
