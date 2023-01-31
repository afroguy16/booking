import { Box } from "@chakra-ui/react";
import format from "date-fns/format";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { SelectDatePropsI } from "../../../interfaces";

export default ({ onSelectDate }: SelectDatePropsI) => {
  const [startDate, setStartDate] = useState(new Date());

  const onSelectDateHandler = (date: Date) => {
    const formattedDate = format(date, "dd.MM.yyyy");
    setStartDate(date);
    onSelectDate(formattedDate);
  };

  return (
    <Box>
      <DatePicker selected={startDate} onChange={onSelectDateHandler} inline />
    </Box>
  );
};
