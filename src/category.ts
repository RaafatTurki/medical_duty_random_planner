export type Category = {
  name: CategoryNames,
  sub?: Category[],
  score?: number,
}

export enum CategoryNames {
  Surgical_MH = "Surgical_MH",
  Medical_MH = "Medical_MH",
  Triage = "Triage",
  Pre_Night = "Pre_Night",
  Morning = "Morning",
  Referrals = "Referrals",
  Night = "Night",
  Medicine = "Medicine",
  Unit_1 = "Unit_1",
  Unit_2 = "Unit_2",
  Unit_3 = "Unit_3",
  Unit_4 = "Unit_4",
  Unit_5 = "Unit_5",
  Hematology = "Hematology",
  Males_Ward = "Males_Ward",
  Females_Ward = "Females_Ward",
  General_Surgery = "General_Surgery",
  Floor_2 = "Floor_2",
  Floor_3 = "Floor_3",
  Floor_5 = "Floor_5",
  OB_GYN = "OB_GYN",
  Delivery_Room = "Delivery_Room",
  OB_War = "OB_War",
  Emergency = "Emergency",
}

export type CategoryScoreMap = Map<string, number>

export function extractCategoryScoreMap(categories: Category[], parentPath: string[] = []): CategoryScoreMap {
  const res = new Map<string, number>()

  for (const category of categories) {
    const currPath = [...parentPath, category.name]
    const pathStr = currPath.join(":")

    if (category.score !== undefined) res.set(pathStr, category.score)

    if (category.sub) {
      const subMap = extractCategoryScoreMap(category.sub, currPath)
      subMap.forEach((subScore, subPath) => res.set(subPath, subScore))
    }
  }

  return res;
}
