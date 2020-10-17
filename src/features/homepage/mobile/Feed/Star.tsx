import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { fameStar, shameStar } from 'assets/icons'

interface StarProps {
	quantity: number
	value: number
}

const Star: FunctionComponent<StarProps> = ({ quantity, value }) => {
	return (
		<StarContainer>
			<StarImg src={value > 0 ? fameStar : shameStar} />
			{quantity !== 1 && <Quantity>{quantity}x</Quantity>}
			<Value>{value}</Value>
		</StarContainer>
	)
}

const StarContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
`

const StarImg = styled.img`
	position: absolute;
	height: 80px;
	width: 85px;
`

const Quantity = styled.div`
	position: absolute;
	left: 22px;
	top: 0;
	height: 20px;
	width: 20px;
	font-family: Amsi Pro Narw;
	font-style: normal;
	font-weight: 800;
	font-size: 15.6279px;
	line-height: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	color: #f4f4f4;
	background: #262626;
	border: 1.30232px solid #c22626;
	border-radius: 20px;
	z-index: 10;
`
const Value = styled.div`
	font-family: Amsi Pro Narw;
	font-style: normal;
	font-weight: 800;
	font-size: 24.59px;
	line-height: 32px;
	text-align: center;
	letter-spacing: -0.02em;
	color: #262626;
	z-index: 10;
	margin-top: 10px;
`

export default Star
