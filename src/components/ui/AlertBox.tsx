import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import IconButton from '@mui/joy/IconButton';

import { ColorPaletteProp } from '@mui/joy/styles';

interface Props {
  title: string;
  color: ColorPaletteProp;
  icon: React.ReactElement;
}
export default function AlertBox({
  title,
  color,
  icon,
}: Props) {
  return (
    <Box
      sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: 'column' }}>
      <Alert
        key={title}
        sx={{ alignItems: 'flex-start' }}
        startDecorator={icon}
        variant="soft"
        color={color}
        endDecorator={
          <IconButton variant="soft" color={color}>
            <CloseRoundedIcon />
          </IconButton>
        }>
        {title}
      </Alert>
    </Box>
  );
}