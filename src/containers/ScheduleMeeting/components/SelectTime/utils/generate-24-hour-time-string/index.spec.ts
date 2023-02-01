import generate24HourTimeString from "."
import { TWENTY_FOUR_HOUR_STRING } from "../../../../constants"

const EXPECTED = [...TWENTY_FOUR_HOUR_STRING]

describe("SelectTime Utility Function - Generate24HourTimeString", () => {
  it("should generate a static list of 24 hours in 00:00 format", () => {
    expect(generate24HourTimeString).toStrictEqual(EXPECTED)
  })
})
