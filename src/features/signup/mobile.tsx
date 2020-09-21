import React, { FunctionComponent, useState } from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { signup } from 'store/slices/userSlice'
import TextInput from 'components/inputs/text'
import Logo from 'components/Logo'
import Login from 'features/login'

const SignUp: FunctionComponent = () => {
	const dispatch = useDispatch()
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password1, setPassword1] = useState('')
	const [password2, setPassword2] = useState('')
	const [login, setLogin] = useState(false)
	const [error, setError] = useState('')
	const handleSignUp = () => {
		if (!username) return setError('Your Name (First Last) is required')
		if (!email) return setError('Your Email is required')
		if (password1 !== password2) return setError('passwords do not match')
		dispatch(
			signup(
				{
					email,
					username
				},
				password1
			)
		)
	}

	return (
		<Container>
			<Logo />
			<LoginButton onClick={() => setLogin(true)}>Login</LoginButton>
			{login && <Grey onClick={() => setLogin(false)} />}
			{login && <Login />}
			<Header>Sign up to get started.</Header>
			<SubHeader>Do some stuff! Yeah real good stuff!</SubHeader>
			{error && <Error>{error}</Error>}
			<TextInput
				handleInput={(e: React.ChangeEvent<HTMLInputElement>) =>
					setUsername(e.target.value)
				}
				value={username}
				label={'Your Name (First Last) *'}
			/>
			<TextInput
				handleInput={(e: React.ChangeEvent<HTMLInputElement>) =>
					setEmail(e.target.value)
				}
				value={email}
				label={'Your Email *'}
			/>

			<TextInput
				handleInput={(e: React.ChangeEvent<HTMLInputElement>) =>
					setPassword1(e.target.value)
				}
				type="password"
				value={password1}
				label={'Password *'}
			/>
			<TextInput
				handleInput={(e: React.ChangeEvent<HTMLInputElement>) =>
					setPassword2(e.target.value)
				}
				type="password"
				value={password2}
				label={'Confirm Password *'}
			/>
			{error && <Error>{error}</Error>}
			<SubmitContainer>
				<SubmitButton onClick={handleSignUp}>Submit</SubmitButton>
			</SubmitContainer>
		</Container>
	)
}

const Container = styled.div`
	padding: 20px;
	height: 100vh;
	overflow: scroll;
	color: #696868;
`
const Error = styled.div`
	border-radius: 2px;
	background: #cc3b3b
		url(//assets.squarespace.com/universal/images-v6/standard/icon_close_7_light.png)
		no-repeat 9px 50%;
	color: #fff;
	display: inline-block;
	font-size: 13px;
	line-height: 23px;
	margin: 12px 0;
	padding: 5px 15px 3px 25px;
`
const Header = styled.h3`
	font-family: Poppins;
	font-style: normal;
	font-size: calc(1.44vh + 1rem);
	line-height: 1.3328;
	letter-spacing: -0.408px;
	color: #404040;
	width: 90%;
	text-align: left;
	margin-top: 40px;
	margin-bottom: 20px;
`

const SubHeader = styled.div`
	font-family: Poppins;
	font-style: normal;
	font-size: 15px;
	line-height: 25px;
	letter-spacing: -0.408px;
	color: #404040;
	width: 90%;
	margin-top: none;
	text-align: left;
	margin-bottom: 20px;
`

const SubmitButton = styled.button`
	background: transparent !important;
	color: #000 !important;
	border: 2px solid #000 !important;
	font-family: Poppins;
	font-weight: 400;
	font-style: normal;
	letter-spacing: 0em;
	text-transform: none;
	line-height: 1.9em;
	font-size: calc(0vh + 1rem) !important;
	padding: 0.8em 1.336em;
	margin-bottom: 20px;
`

const SubmitContainer = styled.div`
	width: 90%;
	display: flex;
	justify-content: flex-start;
	margin-top: 20px;
	padding-bottom: 20px;
`

const Grey = styled.div`
	height: 100vh;
	width: 100vw;
	z-index: 50;
	opacity: 0.6;
	background-color: #777375;
	position: absolute;
	left: 0;
	top: 0;
`
const LoginButton = styled.div`
	position: absolute;
	width: 87px;
	height: 17px;
	left: 78%;
	top: 2%;
`

export default SignUp
