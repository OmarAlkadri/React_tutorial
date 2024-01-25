import * as React from 'react'
import NProgress from 'nprogress'
import { Box } from '@mui/system'

const LoadingScreen: React.FC = function () {
  React.useEffect(() => {
    NProgress.start()
    return () => {
      NProgress.done()
    }
  }, [])

  return (
    <Box
      sx={{
        // backgroundColor: ' ',
        minHeight: '100%',
      }}
    />
  )
}

export default LoadingScreen
