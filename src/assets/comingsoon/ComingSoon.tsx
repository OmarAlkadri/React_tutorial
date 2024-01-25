import React from 'react'
import ComingSoonAnimationData from './animationsData/coming-soon-under-construction.json'
import LottieDrawer from './LottieDrawer'

export default function LottieAnimation() {
  return (
    <LottieDrawer
      jsonAnimationData={ComingSoonAnimationData}
      pageTitle="Sayfa Çalışması"
      pageSubTitle="Bu sayfa ile ilgili çalışmalar devam etmektedir."
      width={900}
      height={606}
    />
  )
}
