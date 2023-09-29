import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import { Typography } from '@mui/joy';
import { useAuth } from '../../contexts/AuthContext';
import ResetPassModal from './ResetPassModal';
import { useState } from 'react';

export default function AccountMenu() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { currentUser, logOut }:any = useAuth();
const [emailCapitalLetter] = useState(currentUser.email[0].toUpperCase());

  function handleLogOut() {
    logOut();
  }
  function handleChangePassword() {
    setModalOpen(true);
  }

  return (
    <>
      {modalOpen && <ResetPassModal open={modalOpen} setOpen={setModalOpen} />}

      <Dropdown>
        <MenuButton size="sm" sx={{ ml: 2, borderRadius: 30 }}>
          <Typography>{emailCapitalLetter}</Typography>
        </MenuButton>

        <Menu>
          <MenuItem>
            <Typography level='body-xs'>{currentUser.email}</Typography>
          </MenuItem>
          <MenuItem onClick={handleChangePassword}>Change password</MenuItem>
          <MenuItem onClick={handleLogOut}>Log out</MenuItem>
          {/* <MenuItem>Logout</MenuItem> */}
        </Menu>
      </Dropdown>
    </>
  );
}
