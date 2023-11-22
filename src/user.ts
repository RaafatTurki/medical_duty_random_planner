import { CategoryScoreMap } from "./category"

export type UserMonthlyDuty = {
  duty: string,
  dom: number,
}

export type User = {
  id: number,
  name: string,
  scoreTarget: number
  monthlyDuties: UserMonthlyDuty[]
}
