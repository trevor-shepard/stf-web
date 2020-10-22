import React, { FunctionComponent, Dispatch, SetStateAction, useState } from 'react'
import styled from '@emotion/styled'
import { Icons } from 'types'
import { dropDown } from 'assets/icons'
import {
	apple,
	beer,
	bread,
	dance,
	drink,
	fastfood,
	heart,
	mentalhealth,
	poisen,
	run,
	sleep,
	tv,
	yoga
} from 'assets/activity-icons'
const IconLibrary = {
	apple,
	beer,
	bread,
	dance,
	drink,
	fastfood,
	heart,
	mentalhealth,
	poisen,
	run,
	sleep,
	tv,
	yoga
}

interface Props {
    icon: Icons
    setIcon: Dispatch<SetStateAction<Icons>>
}

const IconPicker: FunctionComponent<Props>= ({ icon, setIcon}) => {
	const [drop, setDrop] = useState(false)


    const iconEls = Object.keys(IconLibrary).sort().map((name, i) => <Icon key={`icon-${i}`} src={IconLibrary[name as Icons]} onClick={() => {
		setIcon(name as Icons)
		setDrop(false)
    }} />)
    
    return (
        <Container>
					<Icon src={IconLibrary[icon]} />
					<DropDown drop={drop} src={dropDown} onClick={() => setDrop(!drop)} />
					{drop && 
						<IconList>
							{iconEls}
						</IconList>
					}
				</Container>
    )
}



const Container = styled.div`
	position: relative;
`
const Icon = styled.img`
	height: 25px;
	width: 25px;
`
const IconList = styled.div`
	z-index: 4;
	position: absolute;
	left: 0; 
	right: 0; 
	margin-left: auto; 
	margin-right: auto; 
	width: 30px; /* Need a specific value to work */
	background-color: #ffffff;
	z-index: 10;
	border: 1px solid black;
	padding: 10px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	top: 40px;

`

interface DropProps {
	drop: boolean
}

const DropDown = styled.img<DropProps>`
	${({drop}) => drop ? `transform: rotate(180deg);` : null }
	height: 8px;
	width: 16px;
	position: absolute;
	right: 25px;
	top: 10px;
`






export default IconPicker;