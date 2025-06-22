import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useCards } from "../../../contexts/CardContext";
import { CardList } from "./CardList";
import { Donate } from "./Donate";
import 'groupby-polyfill/lib/polyfill.js'

import checkmark from "./assets/checkmark.svg";
import Slider from '@mui/material/Slider';

export const ListWrap = styled.div`
    position: sticky;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: flex-start;
    justify-self: flex-start;
    box-sizing: border-box;
    background-color: #181a1c;
    border: 2px solid #d8cc65;
    border-radius: 5px;
    margin-top: 20px;
    top: 20px;
    width: calc(100% - 20px);
    height: calc(100svh - 110px);
    min-height: 500px;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: ${props => props.$width};
    align-items: center;
    margin: 0 auto;
`;

const SliderWrap = styled.div`
    padding: 15px 0 0 0;
    width: 75%;
`;

const MaxLandSlider = styled(Slider)`
    & .MuiSlider-thumb{
        background-color: #6b631d;
    }
    & .MuiSlider-track{
        background-color: #d8cc65;
        border-color: black;
    }
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: ${props => props.$width};
    align-items: center;
    margin: 0 auto;
`;

const H3 = styled.h3`
    padding: 0;
    color: ${props => 
        props.$overflow[0] > props.$overflow[1] 
            ? "#FF000066" 
            : props.$overflow[0] === props.$overflow[1] 
            ? "#43a047"
            : "#d8cc65"
    };
    margin: 0 auto 5px auto;
    text-align: center;
    font-weight: normal;
    font-size: 1.2rem;
    font-weight: bold;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    @media (min-width: 2000px) {
        font-size: 1.5rem;
    }
    @media (max-width: 1500px) {
        font-size: 0.7rem;
    }
`;

const ListBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    min-height: 50%;
    font-size: 1rem;
    margin: 0;
    overflow-y: scroll;
    padding-bottom: 20px;
    border-radius: 5px;
`


const Img = styled.img`
    transform: translate(0, 5%);
`

const TitleText = styled.h2`
    display: block;
    font-size: 1.5rem;
    color: #d8cc65;
    font-weight: 600;
    padding: 10px 10px;
    width: 50%;
    text-align: center;
    margin: 5px 5px 0 5px;
    border-radius: 5px;
    box-sizing: border-box;
    background-color: transparent;
`;

const Button = styled.button`
    font-size: 1.2rem;
    padding: 3px;
    height: 36px;
    width: 80%;
    z-index: 5;
    margin: 0 auto;
    color: #d8cc65;
    border-radius: 5px;
    border: 2px solid #d8cc65;
    background-color: transparent;
    &:hover {
        background-color:  rgba(0, 0, 0, 1);
    }
    &:active {
        color: black;
        border-color: black;
        background-color: #d8cc65;
    }
    @media (max-width: 1000px) {
        font-size: 1rem;
    }
`;


export const LandbaseWrapper = ({headless = false}) => {

    const { cardSearch, combineDuplicates, getNameFromCard, landBaseList, resetLandBaseList, setAddAllTags, setMaxLands, maxLands, bigDesktop, mobileView, backFaces, hoverCard, setHoverCard } = useCards();

    const [clipboarded, setClipboarded] = useState(false);
    const [confirmClear, setConfirmClear] = useState(false);

    const clearButton = () => {
        if(!confirmClear)
            setConfirmClear(true);
        else {
            resetLandBaseList();
            setAddAllTags([]);
            setConfirmClear(false);
        }
        setTimeout(() => {setConfirmClear(false)}, 2000)
    }

    const copyButton = () => {
        navigator.clipboard.writeText(
            combineDuplicates(landBaseList).reduce((acc, card, i) => acc + ((i !== 0) ? "\n" : "") + card.quantity + "x " + getNameFromCard(card.card), "")
        );
        setClipboarded(true)
        setTimeout(() => {setClipboarded(false)}, 1000)
    }

    const sliderOnChange = (e) => {
        if(e?.target ?? false) {
            setMaxLands(e.target.value);
        }
    }

    useEffect(() => {
        setClipboarded(false);
        setConfirmClear(false);
    }, [cardSearch, setClipboarded, setConfirmClear])

    const cardTotal = (landBaseList ?? []).reduce((acc, {quantity}) => acc + quantity, 0)

    const innerWrap = <>
        <Column $width={"100%"}>
            { !headless && <TitleText>Landbase</TitleText> }
            <Row $width={"90%"}>
                    <Button onClick={clearButton}>
                        {confirmClear
                            ? "Confirm?"
                            : "Clear"
                        }
                    </Button>
                    <Button onClick={copyButton}>
                        {
                            clipboarded 
                            ? <Img height={24} src={checkmark}/>
                            : "Copy"
                        }
                    </Button>
                </Row>
                <SliderWrap>
                    <MaxLandSlider key={"Land Slider"} color="#d8cc65" value={maxLands} onChange={sliderOnChange} min={1} max={100}/>
                </SliderWrap>
                <H3 $overflow={[cardTotal, maxLands]}>
                    {`Total: ${cardTotal} / ${maxLands}`}
                </H3>
        </Column>    
        <ListBlock>
            <CardList/>
        </ListBlock>
        <Donate/>
    </>

    return <>
        {
            headless
                ? innerWrap
                : <ListWrap id="land-base-wrap">
                    {innerWrap}
                </ListWrap>
        }
    </>
}
