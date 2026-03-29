import { activity1 } from './activity1-locker'
import { activity2 } from './activity2-inventory'
import { activity3 } from './activity3-compound'
import { activity4 } from './activity4-tts'
import { activity5 } from './activity5-rps'
import { activity6 } from './activity6-fitness'
import type { ActivityData } from './types'

export const activities: ActivityData[] = [activity1, activity2, activity3, activity4, activity5, activity6]

export function getActivityById(id: number): ActivityData | undefined {
  return activities.find(a => a.id === id)
}
