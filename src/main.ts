import { Category, CategoryNames as CategoryName, extractCategoryScoreMap } from './category'
import { User } from './user'
import { getDaysInMonth, getRandomMapEntry, randNumsUniqueToMax } from './utils'

const categories: Category[] = [
  {
    name: CategoryName.Emergency,
    sub: [
      {
        name: CategoryName.Night,
        sub: [
          { name: CategoryName.Surgical_MH,  score: 1 },
          { name: CategoryName.Medical_MH,   score: 1 },
          { name: CategoryName.Triage,       score: 2 },
        ],
      },
      {
        name: CategoryName.Pre_Night,
        sub: [
          { name: CategoryName.Surgical_MH,  score: 1, },
          { name: CategoryName.Medical_MH,   score: 2, },
          { name: CategoryName.Triage,       score: 3, },
        ],
      },
      {
        name: CategoryName.Morning,
        sub: [
          { name: CategoryName.Surgical_MH,  score: 1 },
          { name: CategoryName.Medical_MH,   score: 1 },
          { name: CategoryName.Triage,       score: 2 },
        ],
      },
    ],
  },
  {
    name: CategoryName.Referrals,
    sub: [
      { name: CategoryName.Morning,  score: 1 },
      { name: CategoryName.Night,    score: 1 },
    ],
  },
  {
    name: CategoryName.Medicine,
    sub: [
      { name: CategoryName.Unit_1, score: 2 },
      { name: CategoryName.Unit_2, score: 2 },
      { name: CategoryName.Unit_3, score: 2 },
      { name: CategoryName.Unit_4, score: 2 },
      { name: CategoryName.Unit_5, score: 2 },
    ],
  },
  {
    name: CategoryName.Hematology,
    sub: [
      { name: CategoryName.Males_Ward,   score: 1 },
      { name: CategoryName.Females_Ward, score: 1 },
    ],
  },
  {
    name: CategoryName.General_Surgery,
    sub: [
      { name: CategoryName.Floor_2,  score: 1 },
      { name: CategoryName.Floor_3,  score: 1 },
      { name: CategoryName.Floor_5,  score: 1 },
    ],
  },
  {
    name: CategoryName.OB_GYN,
    sub: [
      { name: CategoryName.Delivery_Room,  score: 1 },
      { name: CategoryName.OB_War,         score: 1 },
    ],
  },
]

const users: User[] = [
  {
    id: 1,
    name: "Joana Doe",
    scoreTarget: 21,
    monthlyDuties: [
      { duty: "Emergency:Night:Surgical_MH", dom: 1 },
      { duty: "Referrals:Night", dom: 3 },
      { duty: "Emergency:Pre_Night:Surgical_MH", dom: 12 },
      { duty: "Emergency:Night:Triage", dom: 19 },
      { duty: "Emergency:Night:Surgical_MH", dom: 20 },
      { duty: "Emergency:Night:Medical_MH", dom: 21 },
    ],
  },
  {
    id: 2,
    name: "Raafat Turki",
    scoreTarget: 22,
    monthlyDuties: [
    ],
  },
]

// get the "leaf" categories into a map of <string_path_to leaf, leaf_score>
const scorePerCategory = extractCategoryScoreMap(categories)

// do the calculations
users.forEach((user) => {
  let duties: string[] = []

  // calculate base user score
  let totalScore = user.monthlyDuties.reduce((acc, curr, i) => {
    // duties.push(curr.duty)
    return acc + (scorePerCategory.get(curr.duty) ?? 0)
  }, 0)

  // a user comes in w a base score already greater than their scoreTarget
  if (totalScore > user.scoreTarget) {
    // TODO: handle faulty users
  }

  // add up user scores to the users scoreTarget
  while(totalScore < user.scoreTarget) {
    const entry = getRandomMapEntry(scorePerCategory)

    if (entry) {
      const [duty, score] = entry
      if (totalScore + score <= user.scoreTarget) {
        duties.push(duty)
        totalScore += score
      }
    }
  }

  const dutyDays = randNumsUniqueToMax(getDaysInMonth(2023, 2), user.monthlyDuties.map(duty => duty.dom), duties.length)
  const generatedMonthlyDuties = duties.map((duty, i) => {
    return { duty: duty, dom: dutyDays[i] + 1 }
  })

  console.log(generatedMonthlyDuties)
})
