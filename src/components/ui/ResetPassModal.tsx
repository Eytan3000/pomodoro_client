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

import { useAuth } from '../../contexts/AuthContext';
import AlertBox from './AlertBox';

//-----------------------------------------------------------
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}
//-----------------------------------------------------------
export default function ResetPassModal({ open, setOpen }: Props) {
  const {  changePassword, reAuthenticate }:any = useAuth();

  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  const [needsAuth, setNeedsAuth] = useState<boolean>(false);

  const [errorTitle, setErrorTitle] = useState<string>('');

  function oldPasswordChangeHandler(e: React.FormEvent<HTMLInputElement>) {
    setOldPassword(e.currentTarget.value);
    setErrorTitle('');
  }
  function newPasswordChangeHandler(e: React.FormEvent<HTMLInputElement>) {
    setNewPassword(e.currentTarget.value);
    setErrorTitle('');
  }
  function passwordConfireChangeHandler(e: React.FormEvent<HTMLInputElement>) {
    setPasswordConfirm(e.currentTarget.value);
    setErrorTitle('');
  }

  //Login
  async function handleSubmit(event?: React.SyntheticEvent) {
    event?.preventDefault();

    // checks:
    if (newPassword.trim() === '' || passwordConfirm.trim() === '') {
      setErrorTitle('No empty fields allowd');
      return;
    }
    if (newPassword.trim() !== passwordConfirm.trim()) {
      setErrorTitle('New passwords do not match');
      return;
    }
    try {
      await changePassword(newPassword);
      setOpen(false);

    } catch (err: any) {
      console.log(err);
      if (err.code === 'auth/requires-recent-login') {
        setNeedsAuth(true);
        // setErrorTitle('Please re-authenticate before changing password');
        return;
      }
      setErrorTitle('Failed to reset password');
    }
  }

  // re-authenticated (in case long time passes from auth)
  async function handleReAuth(event: React.SyntheticEvent) {
    event.preventDefault();
    if (oldPassword.trim() === '') {
      setErrorTitle('No empty fields allowd');
      return;
    }

    try {
      // reauth
      await reAuthenticate(oldPassword);
      await handleSubmit();
      setOpen(false);
    } catch (err) {
      setErrorTitle('Failed to reset password');
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

        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          fontWeight="lg"
          mb={1}
          textAlign={'center'}>
          {!needsAuth ? 'Change Password' : 'Enter old password'}
        </Typography>

        {!needsAuth ? (
          <form onSubmit={handleSubmit}>
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
                placeholder="New password"
                type="password"
                variant="outlined"
                onChange={newPasswordChangeHandler}
              />
              <Input
                name="Outlined"
                placeholder="Password confirmation"
                type="password"
                variant="outlined"
                onChange={passwordConfireChangeHandler}
              />
              <Button type="submit">Submit</Button>

              {errorTitle !== '' && (
                <AlertBox
                  title={errorTitle}
                  color="danger"
                  icon={<ReportIcon />}
                />
              )}
            </Box>
          </form>
        ) : (
          // re-authenticate
          <form onSubmit={handleReAuth}>
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
                placeholder="Enter current password"
                type="password"
                value={oldPassword}
                variant="outlined"
                onChange={oldPasswordChangeHandler}
              />

              <Button type="submit">Submit</Button>

              {errorTitle !== '' && (
                <AlertBox
                  title={errorTitle}
                  color="danger"
                  icon={<ReportIcon />}
                />
              )}
            </Box>
          </form>
        )}
      </Sheet>
    </Modal>
  );
}
