/* eslint-disable */
import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { AppRegistration, ExitToApp } from '@mui/icons-material'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom'
import { Badge, Tooltip } from '@mui/material'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import { useDispatch } from '../../redux/store'
import { setHeaderName } from '../../sessionStorage'
import { useTranslation } from 'react-i18next';
import LanguageSelectorAvatar from './languageSelectorAvatar'


interface propTypes {
  children?: any
  avatarText?: any
  avatar?: any
}


const AvatarMenu = (props: propTypes) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [t] = useTranslation()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch()
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const settings = [t('SelectModule'), t('LogOut')]
  const navigate = useNavigate()

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title={t('UserSettings')}>
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Badge
              // badgeContent={notifications.length}
              // color="error"
              variant="dot"
            >
              {props.children}
            </Badge>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        sx={{
          zIndex: 1000000,
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,

              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,

              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={async () => {


            navigate(encodeURI('/kullanici/profil'), {
              state: {

              },
            })
          }}>
          {props.avatar}
          <Typography>{props.avatarText}</Typography>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            navigate('/')
          }}
        >
          <ListItemIcon>
            <AppRegistration fontSize="small" />
          </ListItemIcon>
          <Typography textAlign="left">{settings[0]}</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => {
            setHeaderName('Bildirimler')

            navigate('/bildirimler')
          }}
        >
          <ListItemIcon>
            <NotificationsActiveIcon fontSize="small" />
          </ListItemIcon>
          <Typography textAlign="left">{t('Notifications')}</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => {
            setHeaderName('Ayarlar')

            navigate('/kullanici-ayarlari')
          }}
        >
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <Typography textAlign="left">{t('Settings')}</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => {
            navigate('/')
          }}
        >
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>

          <Typography textAlign="center">{settings[1]}</Typography>
        </MenuItem>
      </Menu>
    </React.Fragment >
  )
}

export default AvatarMenu
