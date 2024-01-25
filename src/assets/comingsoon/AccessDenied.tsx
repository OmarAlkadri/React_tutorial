import * as React from 'react'
import AccessDeniedAnimationData from './animationsData/access-denied.json'
import LottieDrawer from './LottieDrawer'

export default function AccessDenied() {
  return (
    <LottieDrawer
      jsonAnimationData={AccessDeniedAnimationData}
      pageTitle="Erişim Engeli"
      pageSubTitle="Bu sayfaya erişiminiz yoktur."
      width={750}
      height={600}
    />
  )
}
