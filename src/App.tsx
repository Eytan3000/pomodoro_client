import { CssVarsProvider, Sheet } from '@mui/joy';
// import './App.css';
import Timer from './components/timer/Timer';
import theme from './utils/ExtendTheme';
import { Box } from '@mui/system';
import AppBar from './components/ui/AppBar';

function App() {
  return (
    <>
      <CssVarsProvider disableTransitionOnChange theme={theme}>
        <AppBar />
        {/* <Sheet 
        sx={{
        }}
        >eytan</Sheet> */}
        <Box
          display={'flex'}
          justifyContent={'center'}
          textAlign={'center'}
          alignItems={'center'}
          mt={18}
          minHeight={400}>
          <Timer />
        </Box>
      </CssVarsProvider>
    </>
  );
}

export default App;
