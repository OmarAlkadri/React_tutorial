import * as React from 'react'
import ErrorAnimationData from './animationsData/error-404.json'
import LottieDrawer from './LottieDrawer'

export default function NotFoundPage() {
    return (
        <LottieDrawer
            jsonAnimationData={ErrorAnimationData}
            pageTitle="Bir Hata Oluştu"
            width={900}
            height={606}
        />
    )
}
