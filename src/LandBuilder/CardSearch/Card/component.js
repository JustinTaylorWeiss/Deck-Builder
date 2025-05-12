import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { useCards } from "../../../contexts/CardContext";
import { Tooltip } from 'react-tooltip'
import rotate from "./icons/rotate.png";
import plus from "./icons/plus.svg";
import minus from "./icons/minus.svg";
import addToDeck from "./icons/addToDeck.svg"

const Img = styled.img`
    width: 100%;
    border-radius: 4.2%;
`;

const FlipIcon = styled.img``;

const CardWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    margin: 0;
`;

const AddToDeckButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    position: static; 
    height: 42px;
    border: none;
    width: 100%;
    background-color: transparent;
    border-radius: 10px;
    flex: 3;
    &:hover {
        background-color: rgba(255, 255, 255, 0.6);
    }
    &:active {
        background-color: rgba(255, 255, 255, 1);
    }
`;

const AddToDeckIcon = styled.img`
`;

const Spacer = styled.div`
    display: inline-block;
    height: 42px;
    border-radius: 10px;
    flex: 3;
`

const FlipCardButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 42px;
    border: none;
    background-color: transparent;
    border-radius: 10px;
    flex: 3;
    &:hover {
        background-color: rgba(255, 255, 255, 0.6);
    }
    &:active {
        background-color: rgba(255, 255, 255, 1);
    }
`;

const CardQuantityWrap = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 42px;
    text-align: center;
    width: 100%;
    color: black;
    font-size: 3rem;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 6px;
`;

const CardQuantity = styled.div`
    color: ${props => props.$num === 0 ? "red" : "Black"};
    flex: 1;
    font-size: 2rem;
`;

const AddRemoveButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 42px;
    border: none;
    width: 100%;
    background-color: transparent;
    border-radius: 10px;
    flex: 1;
    &:hover {
        background-color: rgba(255, 255, 255, 0.6);
    }
    &:active {
        background-color: rgba(255, 255, 255, 1);
    }
`;

const AddRemoveIcon = styled.img``;

const CardNameWrap = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 0;
    text-align: center;
`;

const CardName = styled.div`
    position: relative;
    top: 15px;
    font-size: 0.2rem;
    color: transparent;
    z-index: 10;
`;


export const CardWrapper = ({card, x, y}) => {

    const { addRemoveList, setAddRemoveList, addCardToDeckList, searchToMaybeBoard } = useCards();
    const [backFace, setBackFace] = useState(false);

    const findImage = () => (
        (!card?.image_uris ?? false) 
        ? card.card_faces[backFace ? 1 : 0].image_uris.normal
        : card.image_uris.normal
    )
    
    const cardQuantityClick = (e, change) => {
        e.preventDefault();
        setAddRemoveList((prev) => ({
            ...prev,
            [card.oracle_id]:(Math.max((prev[card.oracle_id] ?? (searchToMaybeBoard ? 1 : 0)) + change, 0))
        }))
    }

    const numOfCard = (addRemoveList[card.oracle_id] ?? 1)
    const cardName = (card?.card_faces ?? false)
        ? card.card_faces[0].name + " // " + card.card_faces[1].name
        : card?.name

    return <CardWrap>
        <CardNameWrap><CardName>{cardName}</CardName></CardNameWrap>
        <Img onClick={(e) => cardQuantityClick(e, (numOfCard === 0 ? 1 : -1))} src={findImage()} key={`card${x},${y}`}/>
        <CardQuantityWrap>
            {(card?.card_faces ?? false)
                    ? <>
                        <FlipCardButton data-tooltip-id={`flipCardTT${x},${y}`} onClick={() => setBackFace((prev) => !prev)}><FlipIcon height={42} src={rotate} alt="Flip Card"/></FlipCardButton>
                        <Tooltip id={`flipCardTT${x},${y}`} place="top" content="Flip Card" style={{fontSize: "1rem"}} opacity={1}/>
                    </>
                    : <Spacer/>
            }
            <AddRemoveButton onClick={(e) => cardQuantityClick(e, -1)}><AddRemoveIcon draggable="false" height={36} src={minus} alt="-"/></AddRemoveButton>
            <CardQuantity $num={numOfCard}>{numOfCard}</CardQuantity>
            <AddRemoveButton onClick={(e) => cardQuantityClick(e, +1)}><AddRemoveIcon draggable="false" height={36} src={plus} alt="+"/></AddRemoveButton>
            <AddToDeckButton data-tooltip-id="addToDeckTT" onClick={() => addCardToDeckList({quantity: numOfCard, card: card})}><AddToDeckIcon height={36} src={addToDeck} alt="Add to deck"/></AddToDeckButton>
            <Tooltip id="addToDeckTT" place="top" content="Add to Deck" style={{fontSize: "1rem"}} opacity={1}/>
        </CardQuantityWrap>
    </CardWrap>
};