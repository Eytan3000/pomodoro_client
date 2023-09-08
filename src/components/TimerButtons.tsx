import { Box, Button } from "@mui/joy";

export default function TimerButtons({playing, submitStartClick, submitRestartClick}) {
  return (
    <Box mt={6}>
    <Button
        color="primary"
        variant={!playing ? 'solid' : 'outlined'}
        sx={{
          borderRadius: 20,
          width: '100%',
        }}
        onClick={submitStartClick}>
        {playing ? 'pause' : 'Start'}
      </Button>
      <Button
        variant="plain"
        color='primary'
        sx={{
          marginTop: 1,
          borderRadius: 20,
          width: '70%',
          outlineColor: 'green',
        }}
        onClick={submitRestartClick}>
        Restart
      </Button>
    </Box>
  )
}
