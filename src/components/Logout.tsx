import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { logout } from 'store/slices/userSlice'

const Button: FunctionComponent = () => {
	const dispatch = useDispatch()

	const handleLogout = () => {
		dispatch(logout())
	}
	return <Logout onClick={handleLogout}>logout</Logout>
}

const Logout = styled.div`
	position: absolute;
	width: 87px;
	height: 17px;
	left: 78%;
	top: 2%;
	&:hover {
		cursor: pointer;
	}
`

export default Button
