import React, { FunctionComponent } from 'react'
// import { useMediaQuery } from 'react-responsive'
// import Desktop from './desktop'
import Mobile from './mobile'
const Screen: FunctionComponent = () => {
	return <Mobile />
	// const isTabletOrMobileDevice = useMediaQuery({
	// 	query: '(max-device-width: 1224px)'
	// })

	// return isTabletOrMobileDevice ? <Mobile /> : <Desktop />
}

export default Screen
