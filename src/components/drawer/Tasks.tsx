import { Box, Button, Divider, Stack, Typography } from '@mui/joy';
import TaskCard from './TaskCard';
import TextBox from './TextBox';
import { useEffect, useState } from 'react';
import { createTask, getActiveTasks, getDoneTasks } from '../../utils/http';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../utils/utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../utils/interfaces';
import { useAuth } from '../../contexts/AuthContext';

//------------------------------------------------------------
interface Task {
  content: string;
  id: number;
  status: 'active' | 'done';
}
//------------------------------------------------------------
export default function Tasks() {
  // console.log('tasks');
  const token = useSelector((state: RootState) => state.jwt.accessToken);

  const [isAddTaskActive, setIsAddTaskActive] = useState(false);

  const { currentUser }:any = useAuth();
  const uid = currentUser?.uid;



  // Function to handle the "c" key press
  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'c') {
      handleAddTask();
    }
    if (event.key === 'Escape') {
      setIsAddTaskActive(false);
    }
  }

  useEffect(() => {
    // Add a global event listener for the "keydown" event
    document.addEventListener('keydown', handleKeyPress);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  function handleAddTask() {
    setIsAddTaskActive(true);
  }
  function handleOkClick(content: string) {
    // const uid = currentUser.uid;
    setIsAddTaskActive(false);
    createTaskMutate({ content, token, uid } );
  }


  // -- React Mutation --------------
  const { mutate: createTaskMutate } = useMutation({
    mutationFn:createTask,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ['active-tasks'],
    //   });
    // },
    onSettled: () => {
      queryClient.invalidateQueries(['active-tasks']);
    },
  });

  // -- React Query Active --------------
  const tasksActiveQuery = useQuery<Task[], { message: string }>({
    queryKey: ['active-tasks'],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    queryFn: ({ signal }) => getActiveTasks(signal, token, uid),
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
        {tasksActiveQuery.data.map((task: Task) => (
          <TaskCard key={task.id} task={task} keyNum={task.id} isActiveProp={true} />
        ))}
        {isAddTaskActive ? (
          <TextBox
            handleOkClick={handleOkClick}
            // setExit={setIsAddTaskActive.bind(false)}
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    queryFn: () => getDoneTasks(token, uid),
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
        {tasksDoneQuery.data.map((task: Task) => {
          return <TaskCard key={task.id} task={task} keyNum={task.id} isActiveProp={false} />;
        })}
      </Stack>
    );
  }

  return (
    <Box display="flex" flexDirection="column" height="90%">
      {activeContent}
      {doneContent}
    </Box>
  );
}
