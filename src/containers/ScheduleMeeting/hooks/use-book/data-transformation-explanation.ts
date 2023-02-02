// READ ME

// This doesn't do anything. It's left here so it's easy for the reviewer to understand how the transformation was done.
// In a real app such transformation won't be need becasue the data awould be store in a way that it's useful, else. 
// Else a transformer utility like this would be created and tested outside the hook.

// Time example format 13:42:01 -> transformed to -> 13:00
const transformTime = (time: string) => `${time.split(":")[0]}:00`

// Raw calendar example from the API
// {
//   "calendar": 
//   [
//       {
//         "date_time": "2023-01-23 13:00:00 +0100"
//       },
//       {
//         "date_time": "2023-01-23 14:00:00 +0100"
//       },
//       {
//         "date_time": "2023-01-27 09:00:00 +0100"
//       },
//   ]
// }


const getExtractedMentorSchedule = (rawCalendar: Array<{ date_time: string }>): any => {
  let splitCalendar: Array<Array<string>> = []

  // initial data transformation to
  // [
  //   {
  //     date_time: ["2023-01-23, 13:00:00, +0100"]
  //   },
  //   {
  //     date_time: ["2023-01-23, 14:00:00, +0100"]
  //   },
  //   {
  //     date_time: ["2023-01-27, 09:00:00, +0100"]
  //   },
  // ]
  rawCalendar.forEach(rawDate => {
    splitCalendar.push(rawDate.date_time.split(" "))
  })


  // next transformation - hash is used to ensure we don't do an O(n^2)
  // {
  //   "2023-01-23": ["13:00:00", "14:00:00"],
  //   "2023-01-27", ["09:00:00]
  // }
  const hash: { [key: string]: Array<string> } = {}
  if (splitCalendar.length > 0) {
    splitCalendar.forEach((splitDate) => {
      if (hash[splitDate[0]] === undefined) {
        hash[splitDate[0]] = [transformTime(splitDate[1])]
      } else {
        hash[splitDate[0]].push(transformTime(splitDate[1])) // This is expensive, thankfully in a real app sanitization would be done during input, and there will be no need to incure this cost
      }
    })
  }
  return hash
}

export { }
