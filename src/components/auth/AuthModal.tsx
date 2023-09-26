import {
  Modal,
  Sheet,
  ModalClose,
  Typography,
  Box,
  Button,
  Input,
} from '@mui/joy';
import { useState } from 'react';

import ReportIcon from '@mui/icons-material/Report';
import AlertBox from '../ui/AlertBox';
import { useAuth } from '../../contexts/AuthContext';
import { useDispatch } from 'react-redux';
import { generalActions } from '../../store';
import { User } from 'firebase/auth';
//-----------------------------------------------------------
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}
interface AuthMethods {
  currentUser: User | null | undefined;
  signup: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logOut: () => void;
  resetPassword: () => void;
}
interface ErrorType {
  code: string;
}
//-----------------------------------------------------------
export default function AuthModal({ open, setOpen }: Props) {
  const dispatch = useDispatch();
  const { currentUser, signup, login, logOut, resetPassword }: AuthMethods = useAuth();

  const [isLoginModal, setIsLoginModal] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [errorTitle, setErrorTitle] = useState<string>('');

  function emailChangeHandler(e: React.FormEvent<HTMLInputElement>) {
    setEmail(e.currentTarget.value);
    setErrorTitle('');
  }

  function passwordChangeHandler(e: React.FormEvent<HTMLInputElement>) {
    setPassword(e.currentTarget.value);
  }

  //signup
  async function handleSignupSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    try {
      await signup(email, password);
      // const res = await signup(email, password);
      // console.log(res._tokenResponse.idToken);
      setIsLoginModal(true);
    } catch (error: unknown) {
      const myError = error as ErrorType;
      if (myError.code === 'auth/email-already-in-use') {
        setErrorTitle('Email already in use');
      }
    }
  }

  //Login
  async function handleLoginSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    // Firebase:
    try {
      await login(email, password);
      dispatch(generalActions.changeIsLoggedStatus(true));
      setOpen(false);
    } catch (error: unknown) {
      const myError = error as ErrorType;
      if (myError.code === 'auth/invalid-login-credentials') {
        setErrorTitle('Incorrect email or password');
      }
    }
  }

  async function handleForgotPassword() {
    try {
      const x = await resetPassword();
      console.log(x);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
        }}>
        <ModalClose variant="plain" sx={{ m: 1 }} />
        {isLoginModal ? (
          <>
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              mb={1}
              textAlign={'center'}>
              Login
            </Typography>

            <form onSubmit={handleLoginSubmit}>
              <Box
                sx={{
                  py: 2,
                  display: 'grid',
                  gap: 2,
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}>
                <Input
                  name="Outlined"
                  type="email"
                  placeholder="Email"
                  variant="outlined"
                  onChange={emailChangeHandler}
                />
                <Input
                  name="Outlined"
                  placeholder="Password"
                  type="password"
                  variant="outlined"
                  onChange={passwordChangeHandler}
                />
                <Button type="submit">Submit</Button>

                <Typography
                  level="body-sm"
                  textAlign={'center'}
                  id="modal-desc"
                  textColor="text.tertiary">
                  <a href="#" onClick={() => setIsLoginModal(false)}>
                    Sign Up
                  </a>
                </Typography>
                <Typography
                  level="body-sm"
                  textAlign={'center'}
                  id="modal-desc"
                  textColor="text.tertiary">
                  <a href="#" onClick={handleForgotPassword}>
                    Forgot Password{' '}
                  </a>
                </Typography>
                {errorTitle !== '' && (
                  <AlertBox
                    title={errorTitle}
                    color="danger"
                    icon={<ReportIcon />}
                  />
                )}
              </Box>
            </form>
          </>
        ) : (
          <>
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              mb={1}
              textAlign={'center'}>
              Sign Up
            </Typography>

            <form onSubmit={handleSignupSubmit}>
              <Box
                sx={{
                  py: 2,
                  display: 'grid',
                  gap: 2,
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}>
                <Input
                  name="Outlined"
                  type="email"
                  placeholder="Email"
                  variant="outlined"
                  onChange={emailChangeHandler}
                />
                <Input
                  name="Outlined"
                  placeholder="Password"
                  type="password"
                  variant="outlined"
                  onChange={passwordChangeHandler}
                />
                <Button type="submit">Submit</Button>

                <Typography
                  level="body-sm"
                  textAlign={'center'}
                  id="modal-desc"
                  textColor="text.tertiary">
                  <a href="#" onClick={() => setIsLoginModal(true)}>
                    Login
                  </a>
                </Typography>
                {errorTitle !== '' && (
                  <AlertBox
                    title={errorTitle}
                    color="danger"
                    icon={<ReportIcon />}
                  />
                )}
              </Box>
            </form>
          </>
        )}
      </Sheet>
    </Modal>
  );
}
