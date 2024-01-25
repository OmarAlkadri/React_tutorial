/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line no-unused-vars
import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { styled, useTheme } from '@mui/material/styles'
import {
  Divider,
  Grid,
  List,
  Typography,
} from '@mui/material'
import { Location, useLocation } from 'react-router-dom'

interface propTypes {
  open: any
  layoutState: any
  handleDrawerClose: any
}

const getSideBar = (location: Location) => {
  const locationString = decodeURI(location.pathname.split('/')[1])
  switch (locationString) {
    case 'Home':
      return null


    default:
      return null
  }
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const drawerWidth = 240

export const SideBarDrawer = (props: propTypes) => {
  const location = useLocation()
  const theme = useTheme()
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={props.open}
    >
      <DrawerHeader>
        <IconButton onClick={props.handleDrawerClose}>
          {theme.direction === 'ltr' ?
            <ChevronLeftIcon />
            :
            <ChevronRightIcon />
          }
        </IconButton>
      </DrawerHeader>
      <Divider />

      <List>{getSideBar(location)}</List>
      <List>
        <Divider />
        <Grid
          container
          direction="row"
          justifyContent="center"
          sx={{ my: '10px' }}
          textAlign="center"
        >
          <Grid item xs={12}>
            <Typography variant="caption" color="textSecondary">
              {/*global.Version*/}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" color="textSecondary">
              {/*global.AllRightsReserved*/}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
      </List>
    </Drawer>
  )
}
export default SideBarDrawer
