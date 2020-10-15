import React, { FunctionComponent, Dispatch, SetStateAction, useState, useEffect } from 'react'
import styled from '@emotion/styled'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'

interface Props {
	setActivity: Dispatch<SetStateAction<string>>,
	showRecord: Dispatch<SetStateAction<boolean>>,
	
}

const ActivityCarousel: FunctionComponent<Props> = ({ setActivity, showRecord}) => {
	const groups = useSelector((state: RootState) => state.groups)
	const members = useSelector((state: RootState) => state.members)
	const {uid} = useSelector((state: RootState) => state.user)
	const memberActivities = Object.values(members[uid as string].actions)
	
	const [frequency, setFrequency] = useState<{[name:string]: number}>({})

	useEffect(() => {
		const freq: {[name:string]: number} = {}
		
		for (const {name} of memberActivities) {
			if (freq[name]) {freq[name] = freq[name] + 1 } else { freq[name] = 1}
		}

		setFrequency(freq)

	},  [])
    const activities = Object.keys(
		Object.values(groups).reduce((acc, group) => {
			const { activities } = group

			return { ...acc, ...activities }
		}, {})
	).sort((a,b) => frequency[b] ? frequency[b] : 0 - frequency[a] ? frequency[a] : 0 )
	
	const activityEl = activities.map((_activity, i) => {
		const [verb, unit] = _activity.split('$')
		return (
			<Item key={`${i}-carousel-item`} >
				{verb.split('_').join(' ')} a {unit}
			</Item>
		)
	})
    return (
        <Container>
            <Carousel
				showThumbs={false}
				swipeable={true}
				onClickItem={(i: number) =>{
					
					 setActivity(activities[i])
					 showRecord(true)
					}}
            >
                {activityEl}
            </Carousel>
        </Container>
    )
}

const Container = styled.div`
	height: 60px;
`

const Item = styled.div`
	height: 60px;
	color: white
	
`

export default ActivityCarousel