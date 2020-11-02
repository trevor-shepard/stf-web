import React, { useState, useEffect } from 'react'

export default function useContainerDimensions(myRef: React.RefObject<any>) {
	const [dimensions, setDimensions] = useState({
		containerWidth: 0,
		containerHeight: 0
	})

	useEffect(() => {
		const getDimensions = () => ({
			containerWidth: (myRef && myRef.current.offsetWidth) || 0,
			containerHeight: (myRef && myRef.current.offsetHeight) || 0
		})

		const handleResize = () => {
			setDimensions(getDimensions())
		}

		if (myRef.current) {
			setDimensions(getDimensions())
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [myRef])

	return dimensions
}
