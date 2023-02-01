import { TWENTY_FOUR_HOUR_STRING } from "./constants"

const timeSlotTypeValues = [...TWENTY_FOUR_HOUR_STRING] // ugly yeah, but typescript don't work with interators without making things even more ugly (harder to read) :-) 

export type HoursT = typeof timeSlotTypeValues[number]
