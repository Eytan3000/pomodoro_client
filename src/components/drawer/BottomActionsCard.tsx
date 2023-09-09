import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Button, CardActions, Checkbox, IconButton } from '@mui/joy';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
//----------------------------------------------------------------
interface Props {
  task: string;
  index: number;
}
//----------------------------------------------------------------

export default function BottomActionsCard({ task, index }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log('selected');
  // };

  // const cardSx = {
  //   width: '92%',
  //   // boxShadow: 'sm',
  //   overflow: 'auto',
  //   flex: '1',
  // };
  const secondBoxSx = {
    display: 'flex',
    justifyContent: 'space-between',
  };
  const cardActionSx = {
    display: isHovered ? 'flex' : 'none',
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    // justifyContent: 'flex-end',
    justifyContent: 'space-evenly',
    // alignItems: 'right', 
    // background: 'rgba(255, 255, 255, 0.9)',
  };

  // const cardActionSx = {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   background: 'transparent', // Set the background to transparent
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  // };

  // const iconButtonSx = {
  //   background: 'transparent', // Set the background to transparent
  //   borderRadius: '50%', // Make it round
  //   padding: '6px', // Adjust the padding as needed
  // };

  return (
    <Box display={'flex'} justifyContent={'center'}>
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        key={index}
        variant="outlined"
        // sx={cardSx}
      >
        <Box sx={secondBoxSx}>
          <Checkbox disabled={false} size="sm" sx={{ marginRight: 2 }} />

          <CardContent>
            <Typography level="body-sm">{task}</Typography>
          </CardContent>
        
        </Box>

        {/* icons */}
        <CardActions buttonFlex="0 1 120px" sx={cardActionSx}>

          {/* <IconButton sx={isHovered ? iconButtonSx : {}}>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon sx={isHovered ? iconButtonSx : {}}/>
          </IconButton> */}


          <Button variant="plain" color='neutral'>Edit</Button>
          <Button variant="plain">Delete</Button>

        </CardActions>
      </Card>
    </Box>
  );
}
