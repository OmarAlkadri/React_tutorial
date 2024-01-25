/* eslint-disable */
import React from 'react'
import { Avatar, Paper, Box, Divider, Fab, CircularProgress, Tabs, Tab } from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { Grid, CardContent } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getThemeModeStorage, getLanguageStorage, setThemeModeStorage, setLanguageStorage } from '../../sessionStorage'
import CheckIcon from '@mui/icons-material/Check';
import { US, TR, SA } from 'country-flag-icons/react/3x2'
import { useTranslation } from 'react-i18next';
import { setThemeMode, setLanguage } from '../../redux/slices/systemSettings/index'
import { useDispatch, useSelector } from '../../redux/store'
import './index.css'

export const ContextMenuSample = () => {
  const [loading, setLoading] = React.useState(undefined);
  const [loadingLanguage, setLoadingLanguage] = React.useState(undefined);
  const [showCheckIcon, setShowCheckIcon] = React.useState(undefined);
  const [t, il8n] = useTranslation()
  const timer = React.useRef<number>();
  const dispatch = useDispatch()
  const { themeMode, language } = useSelector(
    state => state.systemSettings
  )
  const [success, setSuccess] = React.useState(getThemeModeStorage() == 'dark' ? true : false);

  const [color, setColor] = React.useState<'light' | 'dark'>(getThemeModeStorage());
  const [language_state, setLanguage_state] = React.useState(getLanguageStorage());

  const buttonSxLight = {
    bgcolor: '#ffffff',
    ...(success == true && {
      bgcolor: '#ffffff',
      '&:hover': {
        bgcolor: '#ffffff',
      },
    }),
  };
  const buttonSxDark = {
    bgcolor: '#000000',
    ...(success == false && {
      bgcolor: '#000000',
      '&:hover': {
        bgcolor: '#000000',
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  React.useEffect(() => {
    if (themeMode != color) {
      dispatch(setThemeMode(color))
    }
  }, [color]);

  React.useEffect(() => {
    if (language_state != getLanguageStorage()) {
      dispatch(setLanguage(language_state))
    }

  }, [language_state]);

  const handleButtonClickLight = () => {
    if (color != 'light') {
      setSuccess(undefined);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setColor('light');
        setSuccess(true);
        setLoading(undefined);
      }, 2000);
    }
  };

  const handleButtonClickDark = () => {
    if (color != 'dark') {
      setSuccess(undefined);
      setLoading(false);
      timer.current = window.setTimeout(() => {
        setColor('dark');
        setSuccess(false);
        setLoading(undefined);
      }, 2000);
    }
  };

  const handleButtonClickEN = () => {
    document.body.setAttribute('dir', 'ltr');
    if (language_state != 'EN') {
      setLoadingLanguage('EN');
      timer.current = window.setTimeout(() => {
        setLoadingLanguage(undefined);
        setShowCheckIcon('EN')
        timer.current = window.setTimeout(() => {
          setLanguage_state('EN');
          setShowCheckIcon(undefined)
        }, 1000);
      }, 2000);
    }
  };

  const handleButtonClickAR = () => {
    document.body.setAttribute('dir', 'rtl');
    if (language_state != 'AR') {
      setLoadingLanguage('AR');
      timer.current = window.setTimeout(() => {
        setLoadingLanguage(undefined);
        setShowCheckIcon('AR')
        timer.current = window.setTimeout(() => {
          setLanguage_state('AR');
          setShowCheckIcon(undefined)
        }, 1000);
      }, 2000);
    }
  };

  const handleButtonClickTR = () => {
    console.log('tr')
    document.body.setAttribute('dir', 'ltr');

    if (language_state != 'TR') {
      setLoadingLanguage('TR');
      timer.current = window.setTimeout(() => {
        setLoadingLanguage(undefined);
        setShowCheckIcon('TR')
        timer.current = window.setTimeout(() => {
          setShowCheckIcon(undefined)
          setLanguage_state('TR');
        }, 1000);
      }, 2000);
    }
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  return (
    <Paper elevation={10}>
      <Card sx={{ maxWidth: 10000 }}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={t('SystemSettings')}
        />
        <CardContent>
          <Grid
            container
            justifyContent={'center'}
            alignItems={'center'}
            spacing={2}
          >
            <Grid item xs={6}>
              <Paper elevation={10}>
                <Card sx={{ bgcolor: themeMode == 'dark' ? '#1b5e20' : '#fff59d' }}>
                  <CardHeader
                    title={t('ColorSelection')}
                  />
                  <CardContent>
                    <nav>
                      <div className="navicon">
                        <div></div>
                      </div>

                      <a>Home</a>
                      <a>Categories</a>
                      <a>Recommended</a>
                      <a>Blog</a>
                      <a>Contact</a>

                    </nav>
                    <Tabs value={value} onChange={handleChange} centered>
      <Tab label="Item One" />
      <Tab label="Item Two" />
      <Tab label="Item Three" />
    </Tabs>
                    <Grid
                      item
                      xs={12}
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={4}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ m: 1, position: 'relative' }}>
                          <Fab
                            aria-label="save"
                            style={{ color: '#000000' }}
                            sx={buttonSxDark}
                            onClick={handleButtonClickDark}
                          >
                            {success == false ? <CheckIcon style={{ color: '#ffffff' }} /> : null}
                          </Fab>
                          {loading == false && (
                            <CircularProgress
                              size={68}
                              sx={{
                                color: 'primary',
                                position: 'absolute',
                                top: -6,
                                left: -6,
                                zIndex: 1,
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ m: 1, position: 'relative' }}>
                          <Fab
                            aria-label="save"
                            style={{ color: '#ffffff' }}
                            sx={buttonSxLight}
                            onClick={handleButtonClickLight}
                          >
                            {success == true ? <CheckIcon style={{ color: '#000000' }} /> : null}
                          </Fab>
                          {loading == true && (
                            <CircularProgress
                              size={68}
                              sx={{
                                color: 'primary',
                                position: 'absolute',
                                top: -6,
                                left: -6,
                                zIndex: 1,
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                    </Grid>
                  </CardContent>
                </Card>
              </Paper>
              <Divider orientation="vertical" flexItem />
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={10}>
                <Card sx={{ bgcolor: themeMode == 'dark' ? '#1b5e20' : '#fff59d' }}>
                  <CardHeader
                    title={t('SelectLanguage')}
                  />
                  <CardContent>
                    <Grid
                      container
                      justifyContent={'center'}
                      alignItems={'center'}
                      spacing={6}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ m: 1, position: 'relative' }}>
                          <Fab
                            aria-label="save"
                            style={{ color: themeMode == 'dark' ? '#000000' : '#ffffff' }}
                            sx={color == 'dark' ? buttonSxDark : buttonSxLight}
                            onClick={handleButtonClickTR}
                          >
                            <Avatar sx={{ bgcolor: themeMode == 'dark' ? '#000000' : '#ffffff' }} aria-label="recipe">
                              {showCheckIcon == 'TR' ? <CheckIcon style={{ color: color != 'dark' ? '#000000' : '#ffffff' }} /> : <TR />}
                            </Avatar>
                          </Fab>
                          {loadingLanguage === 'TR' && (
                            <CircularProgress
                              size={68}
                              sx={{
                                color: 'primary',
                                position: 'absolute',
                                top: -6,
                                left: -6,
                                zIndex: 1,
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ m: 1, position: 'relative' }}>
                          <Fab
                            aria-label="save"
                            style={{ color: themeMode == 'dark' ? '#000000' : '#ffffff' }}
                            sx={color == 'dark' ? buttonSxDark : buttonSxLight}
                            onClick={handleButtonClickEN}
                          >
                            <Avatar sx={{ bgcolor: themeMode == 'dark' ? '#000000' : '#ffffff' }} aria-label="recipe">
                              {showCheckIcon == 'EN' ? <CheckIcon style={{ color: color != 'dark' ? '#000000' : '#ffffff' }} /> : <US />}
                            </Avatar>
                          </Fab>
                          {loadingLanguage === 'EN' && (
                            <CircularProgress
                              size={68}
                              sx={{
                                color: 'primary',
                                position: 'absolute',
                                top: -6,
                                left: -6,
                                zIndex: 1,
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ m: 1, position: 'relative' }}>
                          <Fab
                            aria-label="save"
                            style={{ color: themeMode == 'dark' ? '#000000' : '#ffffff' }}
                            sx={color == 'dark' ? buttonSxDark : buttonSxLight}
                            onClick={handleButtonClickAR}
                          >
                            <Avatar sx={{ bgcolor: themeMode == 'dark' ? '#000000' : '#ffffff' }} aria-label="recipe">
                              {showCheckIcon == 'AR' ? <CheckIcon style={{ color: color != 'dark' ? '#000000' : '#ffffff' }} /> : <SA />}
                            </Avatar>
                          </Fab>
                          {loadingLanguage === 'AR' && (
                            <CircularProgress
                              size={68}
                              sx={{
                                color: 'primary',
                                position: 'absolute',
                                top: -6,
                                left: -6,
                                zIndex: 1,
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                    </Grid>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Paper>
  )
}