import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import { Typography } from '@mui/joy';
import { useAuth } from '../../contexts/AuthContext';
import ResetPassModal from './ResetPassModal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generalActions } from '../../store';
import { RootState } from '../../utils/interfaces';

export default function AccountMenu() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { currentUser, logOut }: any = useAuth();

  const dispatch = useDispatch();
  const audioMute = useSelector((state: RootState) => state.general.audioMute);
    

  const [emailCapitalLetter] = useState(currentUser.email[0].toUpperCase());
  function handleLogOut() {
    logOut();
  }
  function handleChangePassword() {
    setModalOpen(true);
  }
  function handleAudioMute(){
    dispatch(generalActions.changeAudioMuteStatus());
  }

  return (
    <>
      {modalOpen && <ResetPassModal open={modalOpen} setOpen={setModalOpen} />}

      <Dropdown>
        <MenuButton size="sm" sx={{ ml: 2, borderRadius: 30 }}>
          <Typography>{emailCapitalLetter}</Typography>
          {/* <Typography>M</Typography> */}
        </MenuButton>

        <Menu>
          <MenuItem>
            <Typography level="body-xs">{currentUser?.email}</Typography>
          </MenuItem>
          <MenuItem onClick={handleAudioMute}>{audioMute ? 'Activate Audio' : 'Mute Audio'}</MenuItem>
          <MenuItem onClick={handleChangePassword}>Change password</MenuItem>
          <MenuItem onClick={handleLogOut}>Log out</MenuItem>
        </Menu>
      </Dropdown>
    </>
  );
}
