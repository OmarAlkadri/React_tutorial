/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
import React, { useEffect, FC } from 'react'
import { CssBaseline, Grid } from '@mui/material'
import { useLocation, useNavigate, useRoutes } from 'react-router-dom'
import { routes } from './layout/routes'
import { useTranslation } from 'react-i18next';
import { getLanguageStorage } from './sessionStorage'
import NotFoundPage from './assets/comingsoon/NotFoundPage';

interface IPropTypes {

}

const Main: FC<IPropTypes> = (props: IPropTypes) => {
  const content = useRoutes(routes)
  const navigate = useNavigate()
  const location = useLocation()
  const [t, il8n] = useTranslation()

  useEffect(() => {
    il8n.changeLanguage(getLanguageStorage())
    navigate('/' + location.pathname.split('/')[1])
  }, [])

  return (
    <>
      <CssBaseline />
      {content ?? (
        <Grid container justifyContent="space-evenly" alignItems="center">
          <Grid
            item
            xs={6}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <NotFoundPage />
          </Grid>
        </Grid>
      )}
    </>
  )
}


export default Main
