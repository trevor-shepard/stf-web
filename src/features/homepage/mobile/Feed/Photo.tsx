import React, { FunctionComponent, Dispatch, SetStateAction } from 'react'
import styled from '@emotion/styled'
const Photo: FunctionComponent<{photo: string, setPhoto: Dispatch<SetStateAction<string>>}> = ({photo, setPhoto}) => {
    return (
        <Container onClick={(e) => {
            
            e.stopPropagation()
            setPhoto('')}}>
            <ImageContainer>
                <Image src={photo} alt={'activity photo'} />
            </ImageContainer>
        </Container>
        
    )
}


const Container = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    z-index: 100;
    background-color: #ffffff;
    

`

const ImageContainer = styled.div`
    height: 90%;
`
const Image = styled.img`
    height: 90%;
	width: auto;
`


export default Photo