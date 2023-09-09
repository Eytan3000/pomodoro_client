import { Stack } from '@mui/joy';
import BottomActionsCard from './BottomActionsCard';

const tasks = [
  'task 1 Non unde reiciendis aut eaque voluptatibus',
  'task 2 Non unde reiciendis aut eaque voluptatibus',
  'task 3 Non unde reiciendis aut eaque voluptatibus', 
  'task 4 est quae similique sed animi assumenda ut repellat deserunt a consequatur voluptas. Et repellendus nesciunt et iste voluptate.',
];

export default function Tasks() {
  return (
    <Stack spacing={2} mt={2}>
      {tasks.map((task, index) => (
        <BottomActionsCard task={task} index={index}/>
      ))}
     </Stack>
  );
}


 

