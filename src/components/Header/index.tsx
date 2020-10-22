import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
interface Props {
	Left?: FunctionComponent | JSX.Element | false
	Right?: FunctionComponent | JSX.Element | false
	Middle?: FunctionComponent | JSX.Element | false
}

const Header: FunctionComponent<Props> = ({
	Right,
	Left,
	Middle,
}) => {
	return (
		<Container>
			<LeftContainer>{Left ? Left : <SpaceHolder />}</LeftContainer>
			{Middle ? Middle : <SpaceHolder />}
			<RightContainer>{Right ? Right : <SpaceHolder />}</RightContainer>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	height: 60px;
	border-bottom: 0.5px solid #7b8794;
	background: #ffffff;
	width: 100%;
	position: relative;
`

const SpaceHolder = styled.div`
	width: 18px;
	padding-left: 4%;
`

const LeftContainer = styled.div`
	position: absolute;
	left: 10px;
`
const RightContainer = styled.div`
	position: absolute;
	right: 10px;
`

export default Header
