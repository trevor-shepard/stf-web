import React, { FunctionComponent } from 'react'
import moment from 'moment'
import styled from '@emotion/styled'
import { Action } from 'types'

interface Props {
	action: Action
	username: string
}

const FeedListItem: FunctionComponent<Props> = ({ action, username }) => {
	const { date, name, quantity } = action
	const [verb, unit] = name.split('$')

	return (
		<Container>
			<Title>
				{username} {verb.split('_').join(' ')} a {unit} x {quantity}{' '}
			</Title>
			<SubTitle>
				on {moment(date).format('D/M/YY')} at {moment(date).format('H:mm A')}
			</SubTitle>
		</Container>
	)
}

const Container = styled.div`
	width: 90%;
	height: 100px;
	display: flex;
	flex-direction: column;
	background: #ffffff;
	border: 1px solid #000000;
	box-sizing: border-box;
	box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
	border-radius: 8px;
	justify-content: center;
	margin-left: 2%;
	margin-top: 4%;
`

const Title = styled.div`
	font-family: Mulish;
	font-style: normal;
	font-weight: bold;
	font-size: 20px;
	line-height: 120%;
`

const SubTitle = styled.div`
	font-family: Mulish;
	font-style: normal;
	font-size: 20px;
	line-height: 120%;
	color: #323f4b;
`

export default FeedListItem
