import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

interface Props {
	hideModal: () => void
}

const MobileGroups: FunctionComponent<Props> = ({ children, hideModal }) => {
	return (
		<GreyArea onClick={hideModal}>
			<Modal onClick={e => e.stopPropagation()}>{children}</Modal>
		</GreyArea>
	)
}

const GreyArea = styled.div`
	height: 100vh;
	width: 100vw;
	z-index: 50;
	opacity: 0.6;
	background-color: #777375;
	position: absolute;
	left: 0;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`

const Modal = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 298px;
	height: 340px;

	background: #ffffff;
	border: 1px solid #000000;
	box-sizing: border-box;
	border-radius: 10px;
`

export default MobileGroups
