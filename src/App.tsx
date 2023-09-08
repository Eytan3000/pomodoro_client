import { CssVarsProvider } from '@mui/joy';
import './App.css';
import Timer from './components/timer/Timer';
import theme from './utils/ExtendTheme';
// import {createTheme, ThemeProvider} from ''

function App() {

  return (
    <>
    <CssVarsProvider disableTransitionOnChange theme={theme}>
      <div>

        <Timer />
      </div>
      </CssVarsProvider>
    </>
  );
}

export default App;
