import { CssVarsProvider } from '@mui/joy';
import './App.css';
import Timer from './components/timer/Timer';
import theme from './utils/ExtendTheme';
import TimerTypeToggle from './components/TimerTypeToggle';
// import {createTheme, ThemeProvider} from ''

function App() {
  // const [count, setCount] = useState(0)

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
