import React, { FunctionComponent, ChangeEvent } from 'react'
import styled from '@emotion/styled'

interface CheckboxProps {
	label: string
	isSelected: boolean
	onCheckboxChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: FunctionComponent<CheckboxProps> = ({
	label,
	isSelected,
	onCheckboxChange
}) => (
	<Container>
		<Input
			type="checkbox"
			name={label}
			checked={isSelected}
			onChange={onCheckboxChange}
			className="form-check-input"
		/>
		{label}
	</Container>
)

const Input = styled.input`
	margin-top: 7px;
	margin-right: 7px;
`

const Container = styled.label`
	display: flex;
	justify-content: flex-start;
	width: 100;
	text-align: left;
	font-family: Poppins;
	margin-top: 10px;
	align-items: flex-start;
`

export default Checkbox
