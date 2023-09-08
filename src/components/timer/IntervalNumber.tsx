import { Typography } from "@mui/joy";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/interfaces";

interface props{
    intervalNum:number
}
export default function IntervalNumber({
    intervalNum
}:props) {
    const buttonValue = useSelector(
        (state: RootState) => state.timer.toggleTimerType
      );
  return (
    <Typography sx={{ marginTop: 4 }}>
        {(intervalNum === 0 && buttonValue !== 'rest' && '1st interval') ||
          (intervalNum === 1 && '2nd interval') ||
          (intervalNum === 2 && '3rd interval') ||
          (intervalNum === 3 && buttonValue !== 'rest' && '4th interval') ||
          'Long rest'}
      </Typography>
  )
}
