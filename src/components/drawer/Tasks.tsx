import { Box, Button, Divider, Stack, Typography } from '@mui/joy';
import TaskCard from './TaskCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../utils/interfaces';
import TextBox from './textBox';
import { useState } from 'react';

export default function Tasks() {
  // add tasksActive and tasksDone from store.
  const [isAddTaskActive, SetIsAddTaskActive] = useState(false);

  const tasksActive = useSelector(
    (state: RootState) => state.drawer.tasksActive
  );
  const tasksDone = useSelector((state: RootState) => state.drawer.tasksDone);

  function handleAddTask() {
    SetIsAddTaskActive(true);
  }
  function handleOkClick() {
    SetIsAddTaskActive(false);
    //Add here logic for db
  }
  return (
    // Active Tasks
    <Box display="flex" flexDirection="column" height="90%">
      <Stack spacing={1} mt={2}>
        {tasksActive.map((task, index) => (
          <TaskCard task={task} index={index} isActiveProp={true}/>
        ))}
        {isAddTaskActive ? (
          <TextBox handleOkClick={handleOkClick} />
        ) : (
          <Button onClick={handleAddTask} color="primary" variant="plain">
            Add Task
          </Button>
        )}
      </Stack>

      {/* Tasks Done */}
      <Stack spacing={1} mt={6} sx={{ marginTop: 'auto' }}>
        <Typography level="body-lg" textAlign={'center'}>
          Done
        </Typography>
        <Divider sx={{ mt: 2 }} />
        {tasksDone.map((task, index) => {
          return (
              <TaskCard task={task} index={index}  isActiveProp={false}/>
          );
        })}
      </Stack>
    </Box>
  );
}
