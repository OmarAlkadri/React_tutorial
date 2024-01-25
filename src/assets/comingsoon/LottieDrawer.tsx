import React from 'react'
import { useLottie } from 'lottie-react'
import { TypeAnimation } from 'react-type-animation';
import { Box, Divider, Grid, Typography } from '@mui/material'
import { useMediaQuery, useTheme } from '@mui/material'
interface IPropTypes {
  jsonAnimationData: unknown
  pageTitle: string
  pageSubTitle?: string
  width: number
  height: number
  justifyContent?: string
  alignItems?: string
}

function LottieDrawer(props: IPropTypes) {
  const theme = useTheme()
  const mdUp = useMediaQuery(theme.breakpoints.up('md'))
  const isXs = useMediaQuery(theme.breakpoints.down('sm'))
  const propsHeight: number = props.height || 400
  const propsWidth: number = props.width || 400
  const style = {
    justifyContent: props.justifyContent || 'center',
    alignItems: props.alignItems || 'center',
    height:
      (mdUp ? propsHeight : isXs ? propsHeight / 4 : propsHeight / 2) + 'px',
    width: (mdUp ? propsWidth : isXs ? propsWidth / 4 : propsWidth / 2) + 'px',
  }

  const Lottie = () => {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: props.jsonAnimationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    }
    const { View } = useLottie(defaultOptions, style)
    return View
  }
  return (
    <>
      <Divider />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid container item xs={12} justifyContent="center">
          <TypeAnimation
            cursor={true}
            sequence={[props.pageTitle, 1000, '']}
            repeat={Infinity}
            wrapper="h2"
          />
          <Grid container item xs={12} justifyContent="center">
            <Typography variant="subtitle1" sx={{ justifyContent: 'center' }}>
              {props.pageSubTitle}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          justifyContent="center"
          alignItems="center"
        >
          <Box>
            <Lottie />
          </Box>
        </Grid>
      </Grid>
      <Divider />
    </>
  )
}

export default LottieDrawer
