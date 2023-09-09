import { CssVarsProvider, Divider, Grid, Sheet, Typography } from '@mui/joy';
// import './App.css';
import Timer from './components/timer/Timer';
import theme from './utils/ExtendTheme';
import { Box } from '@mui/system';
import AppBar from './components/ui/AppBar';
import Tasks from './components/drawer/Tasks';



function App() {
  return (
    <>
      <CssVarsProvider disableTransitionOnChange theme={theme}>
        <AppBar />

        <Grid
          container
          spacing={2}
          columns={8}
          sx={{ flexGrow: 1, wrap: 'wrap' }}>
          <Grid xs={5} md={6}>
            <Box
              display={'flex'}
              justifyContent={'center'}
              textAlign={'center'}
              alignItems={'center'}
              mt={18}
              minHeight={400}>
              <Timer />
            </Box>
          </Grid>
          <Grid xs={3} md={2}>
            <Sheet
              variant="outlined"
              color="neutral"
              sx={{
                p: 3,
                top: '70px',
                height: '100%',
                borderRadius: 6,
              }}>
              <Typography level="h3" textAlign={'center'}>
                Tasks
              </Typography>
              <Divider sx={{ mt: 2 }} />
              <Tasks />
            </Sheet>
          </Grid>
        </Grid>
      </CssVarsProvider>
    </>
  );
}

export default App;
