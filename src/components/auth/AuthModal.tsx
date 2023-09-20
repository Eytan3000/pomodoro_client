import {
  Modal,
  Sheet,
  ModalClose,
  Typography,
  Textarea,
  Box,
  Button,
} from '@mui/joy';
import { useState } from 'react';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  setIsLogged: (isLogged: boolean) => void;
}
export default function AuthModal({ open, setOpen, setIsLogged }: Props) {
  const [isLoginModal, setIsLoginModal] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function emailChangeHandler(e: React.FormEvent<HTMLTextAreaElement>) {
    setEmail(e.currentTarget.value);
  }

  function passwordChangeHandler(e: React.FormEvent<HTMLTextAreaElement>) {
    setPassword(e.currentTarget.value);
  }
  function handleLoginSubmit() {
    //check if exist

    // if exists:
    setIsLogged(true);
    setOpen(false);
  }
  function handleSignupSubmit() {
    //check if exist
    // sign up
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
                <Textarea
                  name="Outlined"
                  placeholder="Email"
                  variant="outlined"
                  onChange={emailChangeHandler}
                />
                <Textarea
                  name="Outlined"
                  placeholder="Password"
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
                <Textarea
                  name="Outlined"
                  placeholder="Email"
                  variant="outlined"
                  onChange={emailChangeHandler}
                />
                <Textarea
                  name="Outlined"
                  placeholder="Password"
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
              </Box>
            </form>
          </>
        )}
      </Sheet>
    </Modal>
  );
}

//Make sure to use <code>aria-labelledby</code> on the modal dialog with an
// optional <code>aria-describedby</code> attribute.

{
  /* <Typography id="modal-desc" textColor="text.tertiary">
        Make sure to use <code>aria-labelledby</code> on the modal dialog with an
        optional <code>aria-describedby</code> attribute.
      </Typography> */
}
