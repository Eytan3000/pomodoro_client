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
import { deleteTask, editTask } from '../../utils/http';
import { queryClient } from '../../utils/utils';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import TextBox from './textBox';

//----------------------------------------------------------------
interface Task {
  content: string;
  id: number;
  status: 'active' | 'done';
}
interface Props {
  task: Task;
  index: number;
  isActiveProp: boolean;
}
//----------------------------------------------------------------
export default function TaskCard({ task, index, isActiveProp }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(isActiveProp);
  const [isEditing, setIsEditing] = useState(false);

  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['active-tasks'],
      });
    },
  });

  const { mutate:textContentMutate } = useMutation({
    mutationFn: editTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['active-tasks'],
      });
    },
  });


  const handleClickCheckbox = () => {
    setIsActive((prev) => !prev);
    // update db: remove task from Active and add to Done
  };
  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };
  const handleDelete = () => {
    // delete note in db
    mutate(task.id);
  };
  const handleOkClick = (textContent:string) => {
    setIsEditing(false);
    
    //update new note in db.
    textContentMutate({id:task.id, textContent});

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
    <Box display={'flex-grow'} justifyContent={'center'} key={index}>
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
          key={index}
          variant={isActive ? 'outlined' : 'soft'}>
          <Box sx={secondBoxSx}>
            <Checkbox
              onChange={handleClickCheckbox}
              checked={!isActive}
              disabled={false}
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
