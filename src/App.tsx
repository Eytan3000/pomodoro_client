import {
  CssVarsProvider,
  Divider,
  Grid,
  Sheet,
  Typography,
} from '@mui/joy';
import './App.css';
import Timer from './components/timer/Timer';
import theme from './utils/ExtendTheme';
import { Box } from '@mui/system';
import AppBar from './components/ui/AppBar';
import Tasks from './components/drawer/Tasks';
import { useEffect, useState } from 'react';
import AuthModal from './components/auth/AuthModal.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { generalActions, jwtActions } from './store/index.ts';
import LoadingComponent from './components/auth/LoadingComponent.tsx';
import { RootState } from './utils/interfaces.ts';

function App() {
  const isLogged = useSelector((state: RootState) => state.general.isLogged);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const auth = getAuth();

  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();

        dispatch(jwtActions.updateAccessToken(token)); //set redux state
        dispatch(generalActions.changeIsLoggedStatus(true));
        setIsLoading(false);
      } else {
        dispatch(generalActions.changeIsLoggedStatus(false));
        setIsLoading(false);
      }
    });
  }, [auth, dispatch]);

  return (
    <>
      <AuthProvider>
        <CssVarsProvider disableTransitionOnChange theme={theme}>
          <AppBar />

          {modalOpen && (
            <AuthModal
              open={modalOpen}
              setOpen={setModalOpen}
              // setIsLogged={setIsLogged}
            />
          )}

          <Grid
            container
            className={'custom-grid'}
            spacing={2}
            columns={8}
            sx={{
              flexGrow: 1,
              wrap: 'wrap',
            }}>
            <Grid xs={8} md={6}>
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

            {/* Drawer */}
            <Grid xs={8} md={2}>
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
                {isLoading ? (
                  <>
                    <LoadingComponent />
                    <LoadingComponent />
                    <LoadingComponent />
                    <LoadingComponent />
                    <LoadingComponent />
                  </>
                ) : isLogged ? (
                  <>
                    <Tasks />
                  </>
                ) : (
                  <Typography level="body-lg" textAlign={'center'} m={2}>
                    Please{' '}
                    <a href="#" onClick={() => setModalOpen(true)}>
                      log in
                    </a>{' '}
                    to add tasks
                  </Typography>
                )}
              </Sheet>
            </Grid>
          </Grid>
        </CssVarsProvider>
      </AuthProvider>
    </>
  );
}

export default App;
