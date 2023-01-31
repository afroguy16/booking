import { Box } from "@chakra-ui/react";
import format from "date-fns/format";
import { useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { SelectDatePropsI } from "../../interfaces";

const SelectDate = ({ onSelectDate, onClearMessages }: SelectDatePropsI) => {
  const [startDate, setStartDate] = useState(new Date());
  const [init, setInit] = useState(false);

  const onSelectDateHandler = useCallback(
    (date: Date) => {
      const formattedDate = format(date, "dd.MM.yyyy");
      setStartDate(date);
      onSelectDate(formattedDate);
      onClearMessages();
    },
    [onSelectDate, onClearMessages]
  );

  useEffect(() => {
    if (init) return;
    onSelectDateHandler(startDate);
    setInit(true);
  }, [init, startDate, onSelectDateHandler]);

  return (
    <Box>
      <DatePicker selected={startDate} onChange={onSelectDateHandler} inline />
    </Box>
  );
};

export default SelectDate;
