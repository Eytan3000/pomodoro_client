import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Checkbox } from '@mui/joy';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/joy/IconButton';
import { useMutation } from '@tanstack/react-query';
import { deleteTask, editTask, switchTaskStatus } from '../../utils/http';
import { queryClient } from '../../utils/utils';

import TextBox from './TextBox';
import { useSelector } from 'react-redux';
import { RootState } from '../../utils/interfaces';

//----------------------------------------------------------------
interface Task {
  content: string;
  id: number;
  status: 'active' | 'done';
}
interface Props {
  task: Task;
  keyNum: number;
  isActiveProp: boolean;
}
//----------------------------------------------------------------
export default function TaskCard({ task, keyNum, isActiveProp }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(isActiveProp);
  const [isEditing, setIsEditing] = useState(false);
  const token = useSelector((state: RootState) => state.jwt.accessToken);

  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['active-tasks']
      });
      queryClient.invalidateQueries({ queryKey: ['done-tasks'] });
    },
  });

  const { mutate: textContentMutate } = useMutation({
    mutationFn: editTask,
    onMutate: async (data) => {
      const newContent = data.textContent;
  
      // Fetch the current active tasks from the query
      const previousData = queryClient.getQueryData<Task[]>(['active-tasks']) || [];
  
      // Find the task that needs to be updated
      const updatedTaskIndex = previousData?.findIndex((task) => task.id === data.id) || -1;
  
      if (updatedTaskIndex !== -1) {
        // Create a new array with the updated content
        const updatedTasks = [...previousData];
        updatedTasks[updatedTaskIndex].content = newContent;
  
        // Update the query data with the new tasks
        queryClient.setQueryData(['active-tasks'], updatedTasks);
  
        return { previousData };
      }
    },
    // onError: (error, variables, context) => {
    //   // Handle error, if needed
    //   // You can use context.previousData to access the previous data
    // },
    onSettled: () => {
      queryClient.invalidateQueries(['active-tasks']);
    },
  });

  const { mutate: mutateSwitchStatus } = useMutation({
    mutationFn: switchTaskStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(['active-tasks']);
      queryClient.invalidateQueries(['done-tasks']);
    }
  });
  

  const handleClickCheckbox = () => {
    setIsActive((prev) => !prev);
    // update db: remove task from Active and add to Done
    mutateSwitchStatus({task:task, token:token})
  };
  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };
  const handleDelete = () => {
    // delete note in db
    mutate({id:task.id, token});
  };
  const handleOkClick = (textContent: string) => {
    setIsEditing(false);

    //update new note in db.
    textContentMutate({ id: task.id, textContent, token });
  };

  // css sx prop
  const secondBoxSx = {
    display: 'flex',
    justifyContent: 'space-between',
  };
  const iconButtonSX = {
    marginX: '-8px',
    borderRadius: '20px',
    display: isHovered ? 'flex' : 'none',
  };

  return (
    <Box display={'flex-grow'} justifyContent={'center'} key={keyNum}>
      {isEditing ? (
        <TextBox
          handleOkClick={handleOkClick}
          task={task.content}
          setExit={setIsEditing.bind(false)}
        />
      ) : (
        <Card
          sx={{ minHeight: 58 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          key={keyNum}
          variant={isActive ? 'outlined' : 'soft'}>
          <Box sx={secondBoxSx}>
            <Checkbox
              onChange={handleClickCheckbox}
              checked={!isActive}
              size="md"
              sx={{ marginRight: 2 }}
            />

            <CardContent>
              <Typography
                level="body-sm"
                sx={isActive ? {} : { textDecoration: 'line-through' }}>
                {task.content}
              </Typography>
            </CardContent>

            <Box display={'flex'} flexDirection={'column'} mt={-1}>
              <IconButton size={'sm'} sx={iconButtonSX} onClick={handleDelete}>
                <CloseIcon fontSize="small" />
              </IconButton>
              {isActive && (
                <IconButton size={'sm'} sx={iconButtonSX} onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
              )}
            </Box>
          </Box>
        </Card>
      )}
    </Box>
  );
}
