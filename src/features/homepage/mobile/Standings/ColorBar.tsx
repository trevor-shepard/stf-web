import React, { FunctionComponent } from 'react'
import { useSpring, animated } from 'react-spring'
import styled from '@emotion/styled'

const ColorBar: FunctionComponent<{ width: number; score: number }> = ({
	width,
	score
}) => {
	const props = useSpring({
		width: width < 200 ? 200 : width,
		score,
		from: { width: 0, score: 0 },
		config: {
			duration: 2000,
			mass: 1,
			tension: 180,
			friction: 12
		}
	})

	return (
		<CBar style={props} color={score > 0 ? '#00A757' : '#F45757'}>
			<Score>{props.score.interpolate(x => x.toFixed(0))}</Score>
		</CBar>
	)
}

const CBar = styled(animated.div)<{ color: string }>`
	position: absolute;
	z-index: 5;
	height: 100%;
	background-color: ${({ color }) => color};
	left: -10px;
	display: flex;
	flex-direction: row-reverse;
	align-items: center;
	transform: skew(-20deg);
`
const Score = styled(animated.div)`
	font-family: Amsi Pro Narw;
	font-style: normal;
	font-weight: 800;
	font-size: 40px;
	padding-right: 10px;
	transform: skew(20deg);
`

export default ColorBar
