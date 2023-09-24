import { CssVarsProvider, Divider, Grid, Sheet, Typography } from '@mui/joy';
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
import { useDispatch } from 'react-redux';
import { jwtActions } from './store/index.ts';

function App() {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  const auth = getAuth();

  useEffect(() => {
    console.log('useEffect');
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();

        dispatch(jwtActions.updateAccessToken(token)); //set redux state
        setIsLogged(true);
      } else {
        console.log('No logged in user');
        setIsLogged(false);
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
              setIsLogged={setIsLogged}
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

                {isLogged ? (
                  <Tasks />
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
