import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

interface TextInputProps {
	handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void
	value: string
	label: string
	height?: string
	width?: string
	type?: string
}

const TextInput: FunctionComponent<TextInputProps> = ({
	handleInput,
	value,
	height,
	width,
	label,
	type
}) => {
	return (
		<Container width={width ? width : '90%'}>
			<Input
				placeholder={label}
				value={value}
				type={type ? type : 'text'}
				onChange={e => {
					e.preventDefault()
					handleInput(e)
				}}
				height={height ? height : '40px'}
			/>
		</Container>
	)
}

type ContainerProps = {
	width: string
}

const Container = styled.div<ContainerProps>`
	width: ${props => props.width};
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`

type InputProps = {
	height?: string
}

const Input = styled.input<InputProps>`
	font-family: AmsiPro-Ultra;
	width: 100%;
	padding: 12px;
	margin: 6px 0 4px;
	border: 1px solid #ccc;
	background: #fafafa;
	color: #000;
	font-family: sans-serif;
	font-size: 16px;
	line-height: normal;
	box-sizing: border-box;
	border-radius: 2px;
	padding: 5px;
	border: none;
	border-bottom: 6px solid #271600;
	text-transform: uppercase;
	background-color: #ffffff;
	/* &:focus ~ .floating-label{
        top: 8px;
        bottom: 10px;
        left: 20px;
        font-size: 11px;
        opacity: 1;
    } */
`

export default TextInput
