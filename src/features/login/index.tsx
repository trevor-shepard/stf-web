import React, { FunctionComponent, useState } from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { login } from 'store/slices/userSlice'

const Login: FunctionComponent = () => {
	const dispatch = useDispatch()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = () => {
		dispatch(login(email, password))
	}
	// const handleProviderLogin = (providerLogin: () => void) => () =>
	// 	dispatch(providerLogin())

	return (
		<Container>
			<Header>Welcome to Incubate-me</Header>

			<Input
				placeholder={'Email'}
				value={email}
				onChange={e => setEmail(e.target.value)}
			/>

			<Input
				placeholder={'Password'}
				type="password"
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>

			<SubmitButton onClick={handleLogin}>Submit</SubmitButton>
		</Container>
	)
}

const Container = styled.div`
	z-index: 100;
	width: 360px;
	height: 300px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	position: absolute;
	opacity: 1;
	background-color: white;
	left: 0;
	right: 0;
	margin-left: auto;
	margin-right: auto;
	top: 10%;
`

const Header = styled.div`
	font-family: Poppins;
	font-style: normal;
	font-weight: 600;
	font-size: 24px;
	line-height: 25px;
	letter-spacing: -0.408px;
	color: #696868;
	width: 100%;
	padding: 16px;
	margin-top: 20px;
`

const Input = styled.input`
	width: 80%;
	font-family: Poppins;
	font-size: 13px;
	line-height: 22px;
	padding: 5px;
`

const SubmitButton = styled.button`
	font-family: Poppins;
	background-color: #3e3e3e;
	border-radius: 3px;
	color: white;
	display: block;
	width: 30%;
	font-weight: 500;
	line-height: 22px;
	padding: 11px;
	margin-bottom: 22px;
	text-transform: capitalize;
`

export default Login
