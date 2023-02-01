import { useRef, useState } from "react";
import { MentorScheduleAttributesI, MentorScheduleCollectionI, MentorScheduleResponsePayloadI, ScheduleMeetingPayloadI, UseBookReturnPayloadI } from "../../interfaces";
import { HourT } from "../../types";

const useBook = (): UseBookReturnPayloadI => {
  const [error, setError] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let mentorsTotalSchedule = useRef({ mentor: { name: '', time_zone: '' }, schedule: {} })
  const [selectedDateSchedule, setSelectedDateSchedule] = useState<MentorScheduleAttributesI>({ date: '', timeCollection: [] });

  // sample data from API
  // {
  //   "mentor": {
  //     "name": "Max Mustermann",
  //     "time_zone": "-03:00"
  //   },
  //   "calendar": [
  //     {
  //       "date_time": "2023-01-23 13:00:00 +0100"
  //     },
  //     {
  //       "date_time": "2023-01-27 09:00:00 +0100"
  //     },
  //   ]
  // }
  const fetchMentorSchedule = async () => {
    return Promise.resolve({
      "mentor": {
        "name": "Max Mustermann",
        "time_zone": "-03:00"
      },
      "calendar": [
        {
          "date_time": "2023-01-23 13:11:00 +0100"
        },
        {
          "date_time": "2023-01-27 09:21:00 +0100"
        },
        {
          "date_time": "2023-01-27 12:22:00 +0100"
        },
        {
          "date_time": "2023-01-31 14:00:00 +0100"
        },
        {
          "date_time": "2023-02-03 11:00:00 +0100"
        },
        {
          "date_time": "2023-02-09 02:00:00 +0100"
        },
        {
          "date_time": "2023-02-11 02:00:00 +0100"
        },
        {
          "date_time": "2023-02-14 04:00:00 +0100"
        },
        {
          "date_time": "2023-02-15 07:00:00 +0100"
        },
        {
          "date_time": "2023-02-17 18:00:00 +0100"
        },
        {
          "date_time": "2023-02-17 22:00:00 +0100"
        },
        {
          "date_time": "2023-02-18 00:00:00 +0100"
        },
        {
          "date_time": "2023-02-18 19:00:00 +0100"
        },
        {
          "date_time": "2023-02-19 13:00:00 +0100"
        },
        {
          "date_time": "2023-02-20 03:00:00 +0100"
        },
        {
          "date_time": "2023-02-24 20:00:00 +0100"
        },
        {
          "date_time": "2023-02-25 16:00:00 +0100"
        },
        {
          "date_time": "2023-02-26 15:00:00 +0100"
        },
        {
          "date_time": "2023-02-28 11:00:00 +0100"
        },
        {
          "date_time": "2023-02-28 22:00:00 +0100"
        },
        {
          "date_time": "2023-03-01 12:00:00 +0100"
        },
        {
          "date_time": "2023-03-02 04:00:00 +0100"
        },
        {
          "date_time": "2023-03-02 09:00:00 +0100"
        },
        {
          "date_time": "2023-03-02 15:00:00 +0100"
        },
        {
          "date_time": "2023-03-04 06:00:00 +0100"
        },
        {
          "date_time": "2023-03-04 07:00:00 +0100"
        },
        {
          "date_time": "2023-03-11 08:00:00 +0100"
        },
        {
          "date_time": "2023-03-13 17:00:00 +0100"
        },
        {
          "date_time": "2023-03-15 05:00:00 +0100"
        },
        {
          "date_time": "2023-03-15 12:00:00 +0100"
        },
        {
          "date_time": "2023-03-17 15:00:00 +0100"
        },
        {
          "date_time": "2023-03-19 09:00:00 +0100"
        },
        {
          "date_time": "2023-03-23 06:00:00 +0100"
        },
        {
          "date_time": "2023-03-23 19:00:00 +0100"
        },
        {
          "date_time": "2023-03-24 11:00:00 +0100"
        },
        {
          "date_time": "2023-03-25 05:00:00 +0100"
        },
        {
          "date_time": "2023-03-25 21:00:00 +0100"
        },
        {
          "date_time": "2023-03-28 12:00:00 +0200"
        },
        {
          "date_time": "2023-03-30 01:00:00 +0200"
        },
        {
          "date_time": "2023-04-01 18:00:00 +0200"
        },
        {
          "date_time": "2023-04-03 14:00:00 +0200"
        },
        {
          "date_time": "2023-04-06 21:00:00 +0200"
        },
        {
          "date_time": "2023-04-07 12:00:00 +0200"
        },
        {
          "date_time": "2023-04-08 00:00:00 +0200"
        },
        {
          "date_time": "2023-04-10 08:00:00 +0200"
        },
        {
          "date_time": "2023-04-11 05:00:00 +0200"
        },
        {
          "date_time": "2023-04-11 13:00:00 +0200"
        },
        {
          "date_time": "2023-04-13 12:00:00 +0200"
        },
        {
          "date_time": "2023-04-16 01:00:00 +0200"
        },
        {
          "date_time": "2023-04-22 23:00:00 +0200"
        },
        {
          "date_time": "2023-04-23 22:00:00 +0200"
        },
        {
          "date_time": "2023-04-23 23:00:00 +0200"
        },
        {
          "date_time": "2023-04-26 05:00:00 +0200"
        },
        {
          "date_time": "2023-04-27 17:00:00 +0200"
        },
        {
          "date_time": "2023-05-01 02:00:00 +0200"
        },
        {
          "date_time": "2023-05-02 02:00:00 +0200"
        },
        {
          "date_time": "2023-05-02 10:00:00 +0200"
        },
        {
          "date_time": "2023-05-04 16:00:00 +0200"
        },
        {
          "date_time": "2023-05-06 12:00:00 +0200"
        },
        {
          "date_time": "2023-05-07 13:00:00 +0200"
        },
        {
          "date_time": "2023-05-08 18:00:00 +0200"
        },
        {
          "date_time": "2023-05-08 18:00:00 +0200"
        },
        {
          "date_time": "2023-05-09 09:00:00 +0200"
        },
        {
          "date_time": "2023-05-12 01:00:00 +0200"
        },
        {
          "date_time": "2023-05-16 20:00:00 +0200"
        },
        {
          "date_time": "2023-05-17 11:00:00 +0200"
        },
        {
          "date_time": "2023-05-17 15:00:00 +0200"
        },
        {
          "date_time": "2023-05-17 23:00:00 +0200"
        },
        {
          "date_time": "2023-05-19 01:00:00 +0200"
        },
        {
          "date_time": "2023-05-20 02:00:00 +0200"
        },
        {
          "date_time": "2023-05-20 09:00:00 +0200"
        },
        {
          "date_time": "2023-05-21 07:00:00 +0200"
        },
        {
          "date_time": "2023-05-23 07:00:00 +0200"
        },
        {
          "date_time": "2023-05-23 14:00:00 +0200"
        },
        {
          "date_time": "2023-05-24 09:00:00 +0200"
        },
        {
          "date_time": "2023-05-27 15:00:00 +0200"
        },
        {
          "date_time": "2023-05-28 19:00:00 +0200"
        },
        {
          "date_time": "2023-05-30 13:00:00 +0200"
        },
        {
          "date_time": "2023-05-31 00:00:00 +0200"
        },
        {
          "date_time": "2023-06-02 11:00:00 +0200"
        },
        {
          "date_time": "2023-06-03 03:00:00 +0200"
        },
        {
          "date_time": "2023-06-03 07:00:00 +0200"
        },
        {
          "date_time": "2023-06-05 05:00:00 +0200"
        },
        {
          "date_time": "2023-06-05 07:00:00 +0200"
        },
        {
          "date_time": "2023-06-05 16:00:00 +0200"
        },
        {
          "date_time": "2023-06-09 16:00:00 +0200"
        },
        {
          "date_time": "2023-06-10 01:00:00 +0200"
        },
        {
          "date_time": "2023-06-20 06:00:00 +0200"
        },
        {
          "date_time": "2023-06-22 14:00:00 +0200"
        },
        {
          "date_time": "2023-06-26 05:00:00 +0200"
        },
        {
          "date_time": "2023-06-30 23:00:00 +0200"
        },
        {
          "date_time": "2023-07-07 13:00:00 +0200"
        },
        {
          "date_time": "2023-07-07 14:00:00 +0200"
        },
        {
          "date_time": "2023-07-11 06:00:00 +0200"
        },
        {
          "date_time": "2023-07-11 08:00:00 +0200"
        },
        {
          "date_time": "2023-07-13 07:00:00 +0200"
        },
        {
          "date_time": "2023-07-15 06:00:00 +0200"
        },
        {
          "date_time": "2023-07-15 12:00:00 +0200"
        },
        {
          "date_time": "2023-07-15 19:00:00 +0200"
        },
        {
          "date_time": "2023-07-19 12:00:00 +0200"
        },
        {
          "date_time": "2023-07-24 00:00:00 +0200"
        },
        {
          "date_time": "2023-07-24 03:00:00 +0200"
        },
        {
          "date_time": "2023-07-24 12:00:00 +0200"
        },
        {
          "date_time": "2023-07-25 20:00:00 +0200"
        },
        {
          "date_time": "2023-07-26 20:00:00 +0200"
        },
        {
          "date_time": "2023-07-27 00:00:00 +0200"
        },
        {
          "date_time": "2023-07-28 16:00:00 +0200"
        },
        {
          "date_time": "2023-07-29 00:00:00 +0200"
        },
        {
          "date_time": "2023-07-31 03:00:00 +0200"
        },
        {
          "date_time": "2023-08-03 18:00:00 +0200"
        },
        {
          "date_time": "2023-08-04 13:00:00 +0200"
        },
        {
          "date_time": "2023-08-05 20:00:00 +0200"
        },
        {
          "date_time": "2023-08-05 21:00:00 +0200"
        },
        {
          "date_time": "2023-08-06 23:00:00 +0200"
        },
        {
          "date_time": "2023-08-07 02:00:00 +0200"
        },
        {
          "date_time": "2023-08-08 04:00:00 +0200"
        },
        {
          "date_time": "2023-08-12 13:00:00 +0200"
        },
        {
          "date_time": "2023-08-13 10:00:00 +0200"
        },
        {
          "date_time": "2023-08-13 19:00:00 +0200"
        },
        {
          "date_time": "2023-08-14 15:00:00 +0200"
        },
        {
          "date_time": "2023-08-16 03:00:00 +0200"
        },
        {
          "date_time": "2023-08-19 11:00:00 +0200"
        },
        {
          "date_time": "2023-08-19 18:00:00 +0200"
        },
        {
          "date_time": "2023-08-20 04:00:00 +0200"
        },
        {
          "date_time": "2023-08-23 21:00:00 +0200"
        },
        {
          "date_time": "2023-08-25 01:00:00 +0200"
        },
        {
          "date_time": "2023-08-27 18:00:00 +0200"
        },
        {
          "date_time": "2023-08-29 05:00:00 +0200"
        },
        {
          "date_time": "2023-08-31 02:00:00 +0200"
        },
        {
          "date_time": "2023-08-31 12:00:00 +0200"
        }
      ]
    })
  }

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

    // console.log('got called')

    // console.log(splitCalendar)

    // next transformation - hash is used to ensure we don't do an O(n^2)
    // {
    //   "2023-01-23": ["13:00:00", "14:00:00"],
    //   "2023-01-27", ["09:00:00]
    // }

    const hash: { [key: string]: Array<string> } = {}
    // const s = { "2023-01-23": [] }
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

    // // packagedData
    // // {
    // //   {date: "2023-01-23": schedule: ["13:00:00", "14:00:00"]},
    // //   {date: "2023-01-27": schedule: ["09:00:00]}
    // // }
    // const packagedData: Array<{ date: string, timeCollection: Array<HourT> }> = []

    // for (const [key, value] of Object.entries(hash)) {
    //   packagedData.push({ date: key, timeCollection: <Array<HourT>>value })
    // }

    // return packagedData;
  }

  const getPackagedMentorTotalSchedule = (rawMentorSchedule: MentorScheduleResponsePayloadI): MentorScheduleCollectionI => {
    const schedule = getExtractedMentorSchedule(rawMentorSchedule.calendar)
    return ({
      mentor: {
        name: rawMentorSchedule.mentor.name,
        time_zone: rawMentorSchedule.mentor.time_zone
      },
      schedule
    })
  }

  const onSelectDate = async (date: string) => {
    if (date !== selectedDateSchedule.date) {
      // only make call and call the expensive functions above ones
      if (mentorsTotalSchedule.current.schedule = {}) {
        try {
          console.log(mentorsTotalSchedule.current.schedule)
          const mentorSchedule = await fetchMentorSchedule()
          const packagedData = getPackagedMentorTotalSchedule(mentorSchedule)
          mentorsTotalSchedule = {
            ...mentorsTotalSchedule,
            mentor: {
              name: packagedData.mentor.name,
              time_zone: packagedData.mentor.time_zone
            },
            schedule: packagedData.schedule
          } as any
          // mentorsTotalSchedule.current.mentor = { ...packagedData.mentor }
          // mentorsTotalSchedule.current.schedule = [...packagedData.schedule] as any // enforce type
          // onSelectDate(date)
        } catch (e) {
          // Overwrite error
          console.log(e)
          setError('Something went wrong')
        }
      } else {
        console.log(mentorsTotalSchedule.current, mentorsTotalSchedule.current.schedule)
      }
    }
  }

  const onSetBooking = (payload: ScheduleMeetingPayloadI) => {
    console.log(payload)
  }

  return ({
    error,
    isSuccessful,
    isLoading,
    selectedDateBookedTimeSlots: selectedDateSchedule?.timeCollection || [],
    onSelectDate,
    onSetError: (error) => setError(error.message), // We could extract and log the path, which could assist in debugging
    onClearError: () => setError(""),
    onClearSuccess: () => setIsSuccessful(false),
    onSetBooking
  })
}

export default useBook;
