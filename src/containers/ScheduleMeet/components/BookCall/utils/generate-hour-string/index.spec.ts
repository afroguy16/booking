import { ERROR_OUT_OF_BOUND } from "../../constants"
import generateHourString from "."

describe("BookCall Utility Function - GenerateHourString", () => {
  it("should throw an error if -1 is passed as an argument", () => {
    expect(() => generateHourString(-1)).toThrowError(ERROR_OUT_OF_BOUND)
  })

  it("should throw an error if 25 is passed as an argument", () => {
    expect(() => generateHourString(25)).toThrowError(ERROR_OUT_OF_BOUND)
  })

  it("should return 01:00 if 1 is passed as an argument", () => {
    expect(generateHourString(1)).toBe("01:00")
  })

  it("should return 10:00 if 10 is passed as an argument", () => {
    expect(generateHourString(10)).toBe("10:00")
  })
})
