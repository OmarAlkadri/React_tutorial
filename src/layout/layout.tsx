/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, FC, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { styled } from '@mui/material/styles'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { SideBarDrawer } from './sidebar'
import { Outlet, useLocation } from 'react-router-dom'
import { Box } from '@mui/system'
import AvatarMenu from '../components/avatar/avatarMenu'
import UserAvatar from '../components/avatar/userAvatar'
import { Container, Grid } from '@mui/material'
import { setDrawer } from '../redux/slices/systemSettings/index'
import { useDispatch, useSelector } from '../redux/store'
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import LanguageSelectorAvatar from '../components/avatar/languageSelectorAvatar'

const colorsOfAppBar = {
  Home: '#177E89',

  planlama: '#c4ec32',

  Raporlama: '#5B3640',

  saha: '#ffa200',

  kullanici: '#f76464',

  izin: '#7cd0a4',

  SistemYonetimi: '#5f0758',

  bakim: '#0062ff',

  Teslimat: '#53cf48',

  arge: '#0de8f8',

  ayarlar: '#6d5c73',

  bildirimler: '#DD4040',

  'kullanici-ayarlari': '#8158b0'
  // {
  //   Doküman: '#842B30',
  //
  // },
  // {
  //   Veri: '#512C2D',
  //
  // },
  // {
  //   Kullanim: '#B44141',
  //
  // },
  // {
  //   Bildirim: '#DD4040',
  //
  // },
  // {
  //   Loglar: '#0E85AA',
  //
  // },
  // {
  //   Guncellemeler: '#0E85AA',
  //
  // },
}
const drawerWidth = 240

interface IPropTypes { }

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
  background?: any
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open, background }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor: background,
}))

const PathName: React.FC<any> = () => {
  const location = useLocation()
  const strToDecode = location.pathname.split('/')[1]

  return (
    <Typography variant="h6" noWrap component="div" fontFamily={'sans-serif'}>
      {/* TODO: get Module Name use Redux */'test'}
    </Typography>
  )
}

const ColoredAppBar: React.FC<any> = props => {
  const location = useLocation()
  const key = decodeURI(location.pathname.split('/')[1]);

  return (
    <AppBar
      open={props.open}
      background={key ?? '#ff1'}
    >
      <Container maxWidth="xl">
        {props.children}
      </Container>
    </AppBar>
  )
}


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Layout: FC<IPropTypes> = (props: IPropTypes) => {
  useEffect(() => {
    getUser()
  }, [])

  const [open, setOpen] = useState(true)
  const [user, setUser] = useState({ name: 'omar', _id: '1', surname: 'alkadri' })
  const { drawerOpen } = useSelector(state => state.systemSettings)
  const dispatch = useDispatch()

  const getUser = async () => {
    setUser({ name: 'omar', _id: '1', surname: 'alkadri' })
  }

  const userAvatarCreator = () => {
    if (user) {
      return (
        <Grid
          item
          container
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          <LanguageSelectorAvatar></LanguageSelectorAvatar>

          <AvatarMenu
            avatar={
              <UserAvatar
                lettersToShow={user?.name?.charAt(0) + user?.surname?.charAt(0)}
                userID={user._id}
              ></UserAvatar>
            }
            avatarText={user.name + ' ' + user.surname}
          >
            <UserAvatar
              lettersToShow={user.name.charAt(0) + user.surname.charAt(0)}
              userID={user._id}
            >


            </UserAvatar>
          </AvatarMenu>
        </Grid>
      )
    } else {
      return null
    }
  }

  const handleDrawerOpen = () => {
    dispatch(setDrawer(true))
  }

  const handleDrawerClose = () => {
    dispatch(setDrawer(false))
  }

  const pages = ['Products', 'Pricing', 'Blog'];
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <ColoredAppBar position="fixed" open={drawerOpen}>
        <Toolbar disableGutters>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              mr: 2,
              ...(drawerOpen && { display: 'none' }),
            }}
          // className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <PathName></PathName>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {userAvatarCreator()}
          </Box>
        </Toolbar>
      </ColoredAppBar>
      <SideBarDrawer
        open={drawerOpen}
        layoutState={{
          open,
          user,
        }}
        handleDrawerClose={handleDrawerClose}
      ></SideBarDrawer>
      <Main open={drawerOpen}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  )
}

export default Layout
