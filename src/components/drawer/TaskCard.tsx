import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Button, CardActions, Checkbox } from '@mui/joy';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/joy/IconButton';
import { Padding } from '@mui/icons-material';
import TestBox from './textBox';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../utils/interfaces';
import { drawerActions } from '../../store';

//----------------------------------------------------------------
interface Props {
  task: string;
  index: number;
  isActiveProp: boolean;
}
//----------------------------------------------------------------
export default function TaskCard({ task, index, isActiveProp }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(isActiveProp);
  const [isEditing, setIsEditing] = useState(false);

  // const dispatch = useDispatch();
  // const isEditing = useSelector((state: RootState) => state.drawer.isEditing)

  const handleClickCheckbox = () => {
    setIsActive((prev) => !prev);
    // update db: remove task from Active and add to Done
  };
  const handleEdit = () => {
    console.log('handleEdit');
    // dispatch(drawerActions.toggleIsEditing());
    setIsEditing((prev) => !prev);
  };
  const handleDelete = () => {
    console.log('handleDelete');
    // delete note in db
  };
  const handleOkClick = () => {
    setIsEditing(false);
    //update new note in db.
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
        <TestBox handleOkClick={handleOkClick} task={task}/>
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
                {task}
              </Typography>
            </CardContent>

              <Box display={'flex'} flexDirection={'column'} mt={-1}>
                <IconButton size={'sm'} sx={iconButtonSX}>
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
