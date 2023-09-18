import { Box, Button, Divider, Stack, Typography } from '@mui/joy';
import TaskCard from './TaskCard';
import TextBox from './textBox';
import { useState } from 'react';
import { createTask, getActiveTasks, getDoneTasks } from '../../utils/http';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../utils/utils';

//------------------------------------------------------------
interface Task {
  content: string;
  id: number;
  status: 'active' | 'done';
}
//------------------------------------------------------------
export default function Tasks() {
  const [isAddTaskActive, setIsAddTaskActive] = useState(false);

  function handleAddTask() {
    setIsAddTaskActive(true);
  }
  function handleOkClick(content: string) {
    setIsAddTaskActive(false);
    console.log(content);
    mutate({content,});
    //Add here logic for db - add task
    // addTaskMutation.mutate({content:'eytan1'});
  }


// -- React Mutation --------------
const {mutate} = useMutation({
  mutationFn:createTask,
  onSuccess: ()=>{
    queryClient.invalidateQueries({
      queryKey:['active-tasks']
    })
  }
})
// -- React Query Active --------------
  const tasksActiveQuery = useQuery<Task[], { message: string }>({
    queryKey: ['active-tasks'],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
    queryFn: ({signal})=>getActiveTasks(signal),
  });
  let activeContent;
  if (tasksActiveQuery.isLoading) {
    activeContent = (
      <div id="event-details-content">
        <p>Fetching event data...</p>
      </div>
    );
  }
  if (tasksActiveQuery.isError) {
    activeContent = (
      <div id="event-details-content">
        <p>Error</p>
        <p>{tasksActiveQuery.error.message}</p>
      </div>
    );
  }
  if (tasksActiveQuery.data) {
    activeContent = (
      <Stack spacing={1} mt={2}>
        {tasksActiveQuery.data.map((task: Task, index: number) => (
          <TaskCard task={task} index={index} isActiveProp={true} />
        ))}
        {isAddTaskActive ? (
          <TextBox
            handleOkClick={handleOkClick}
            setExit={setIsAddTaskActive.bind(false)}
          />
        ) : (
          <Button onClick={handleAddTask} color="primary" variant="plain">
            Add Task
          </Button>
        )}
      </Stack>
    );
  }

  // -- React Query Done --------------
  const tasksDoneQuery = useQuery<Task[], { message: string }>({
    queryKey: ['done-tasks'],
    queryFn: getDoneTasks,
  });
  let doneContent;
  if (tasksDoneQuery.isLoading) {
    doneContent = (
      <div id="event-details-content">
        <p>Fetching event data...</p>
      </div>
    );
  }
  if (tasksDoneQuery.isError) {
    doneContent = (
      <div id="event-details-content">
        <p>Error</p>
        <p>{tasksDoneQuery.error.message}</p>
      </div>
    );
  }
  if (tasksDoneQuery.data) {
    doneContent = (
      <Stack spacing={1} mt={6} sx={{ marginTop: 'auto' }}>
        <Typography level="body-lg" textAlign={'center'}>
          Done
        </Typography>
        <Divider sx={{ mt: 2 }} />
        {tasksDoneQuery.data.map((task: Task, index: number) => {
          return (
            <TaskCard task={task} index={index} isActiveProp={false} />
          );
        })}
      </Stack>
    )}



  return (

    <Box display="flex" flexDirection="column" height="90%">
      {activeContent}
      {doneContent}
    </Box>
  );
}
