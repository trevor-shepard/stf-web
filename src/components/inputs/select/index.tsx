import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

interface Option {
	value: string
	display: string
}

interface SelectInputProps {
	handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void
	value: string
	options: Option[]
	label?: string
	height?: string
	width?: string
	leftMargin?: string
}

const SelectInput: FunctionComponent<SelectInputProps> = ({
	handleSelect,
	value,
	height,
	width,
	label,
	options,
	leftMargin
}) => {
	const optionElements = options.map(({ value, display }: Option, i) => (
		<option key={`option-${i}`} value={value}>
			{display}
		</option>
	))
	return (
		<Container width={width ? width : '90%'} leftMargin={leftMargin}>
			{label && <Label>{label}</Label>}
			<Select onChange={handleSelect} value={value}>
				{optionElements}
			</Select>
		</Container>
	)
}

type ContainerProps = {
	width: string
	leftMargin?: string
}

const Container = styled.div<ContainerProps>`
	width: ${props => props.width};
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	${({ leftMargin }) => (leftMargin ? 'margin-left: ' + leftMargin : null)}
`

const Select = styled.select`
	font-family: Poppins;
	font-weight: 400;
	font-style: normal;
	letter-spacing: 0em;
	text-transform: none;
	line-height: 1.9em;
	background: #ffffff;
	border: 1px solid #dedede;
	box-sizing: border-box;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
	border-radius: 5px;
	color: #696868;
	padding: 5px;
`

const Label = styled.label`
	font-family: Poppins;
	font-weight: 400;
	font-style: normal;
	letter-spacing: 0em;
	text-transform: none;
	line-height: 1.9em;
`

export default SelectInput
