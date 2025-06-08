import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { useCards } from "../../../contexts/CardContext";
import { Tooltip } from 'react-tooltip'
import rotate from "./icons/rotate.png";
import plus from "./icons/plus.svg";
import minus from "./icons/minus.svg";
import addToDeck from "./icons/addToDeck.svg";
import fillBucket from "./icons/fillBucket.svg";

const Img = styled.img`
    width: 100%;
    border-radius: 15px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border: 3px solid transparent;
    transition-duration: 250ms;
    border-color: ${props => props.$inDeck ? "#d8cc65" : "transparent"};
    &:hover {
        cursor: pointer;
    }
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: calc(100% - 6px);
    margin-top: -23px;
    padding-top: 24px;
    padding-bottom: 4px;
    z-index: -1;
    background-color:rgb(14, 15, 16);
    border-radius: 10px;
    color: #a1952d;
`;

const Price = styled.span`
    font-size: 1rem;
    text-align: center;
    border-radius: 2px;
    padding: 0 3px;
    ${
        props => props.$foil
            ? `
            background: linear-gradient(
                45deg,
                rgba(255, 0, 0, 0.3) 0%,
                rgba(255, 154, 0, 0.3) 10%,
                rgba(208, 222, 33, 0.3) 20%,
                rgba(79,  220, 74, 0.3) 30%,
                rgba(63, 218, 216, 0.3) 40%,
                rgba(47, 201, 226, 0.3) 50%,
                rgba(28, 127, 238, 0.3) 60%,
                rgba(95, 21, 242, 0.3) 70%,
                rgba(186, 12, 248, 0.3) 80%,
                rgba(251, 7, 217, 0.3) 90%,
                rgba(255, 0, 0, 0.3) 100%
            );`
            : ""
    }
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
    width: 100%;
    border-radius: 10px;
    flex: 3;
`

const FillBucketIcon =styled.img`
    height: 33px;
`;

const FillBucketButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 42px;
    border: none;
    width: 100%;
    padding: 0;
    background-color: transparent;
    border-radius: 10px;
    flex: 3;
    filter: invert(1); //Change svg to white in a dumb way
    &:hover {
        background-color: rgba(255, 255, 255, 0.6);
    }
    &:active {
        background-color: rgba(255, 255, 255, 1);
    }
`;

const FlipCardButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 42px;
    width: 100%;
    border: none;
    padding: 0;
    background-color: transparent;
    border-radius: 10px;
    flex: 3;
    filter: invert(1); //Change svg to white in a dumb way
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
    width: calc(100% - 6px);
    color: white;
    font-size: 3rem;
    border-radius: 6px;
`;

const CardQuantity = styled.div`
    color: "Black";
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
    filter: invert(1); //Change svg to white in a dumb way
    &:hover {
        background-color: rgba(255, 255, 255, 0.6);
        cursor: pointer;
    }
    &:active {
        background-color: rgba(255, 255, 255, 1);
    }
    &.svg {
        
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

const PandPWrap = styled.div`
    width:30%;
`;
const PriceAndPopularity = styled.div`
    font-size: 0.8rem;
    margin-left: 10px;
    text-align: left;
`;


export const CardWrapper = ({card, x, y}) => {

    const { removeCardLandBaseList, landBaseList, incOrDecLandBaseCard, addCardToLandBaseList, maxLands } = useCards();
    const [backFace, setBackFace] = useState(false);
    

    const landOnBack = (card?.image_uris ?? false) && 
    (card?.card_faces?.[1]?.type_line ?? "").includes("Land") &&
    (card?.card_faces?.[1]?.type_line ?? "").includes("Land")

    const findImage = () => (
        (!card?.image_uris ?? false) 
            ? card.card_faces[backFace ? 1 : 0].image_uris.normal
            : card.image_uris.normal
    )

    const numOfCard = landBaseList.filter((cardObject) => cardObject.card.name === card.name)?.[0]?.quantity ?? 0
    
    const cardQuantityClick = (e, isNegitive) => {
        e.preventDefault();
        if(numOfCard === 1 && isNegitive){
            removeCardLandBaseList(card)
        }
        else if(numOfCard <= 0 && !isNegitive) {
            addCardToLandBaseList({quantity: 1, card: card})
        }
        else if(numOfCard > 0){
            incOrDecLandBaseCard(card, isNegitive)
        }
    }

    const fillOnClick = () => (
        addCardToLandBaseList({quantity: 
            Math.max(maxLands - (landBaseList ?? []).reduce((acc, {quantity}) => acc + quantity, 0), 0)
            , card: card})
    )
        
    const cardName = (card?.card_faces ?? false)
        ? card.card_faces[0].name + " // " + card.card_faces[1].name
        : card?.name

    return <CardWrap>
        <CardNameWrap><CardName>{cardName}</CardName></CardNameWrap>
        <Img $inDeck={landBaseList.map((cardWrap) => cardWrap?.card?.name ?? "").includes(cardName)} onClick={(e) => cardQuantityClick(e, numOfCard > 0)} src={findImage()} key={`card${x},${y}`}/>
        <Row>
            { card.prices.usd ? <Price>{`$${card.prices.usd}`}</Price> : <Price>{"No prices found"}</Price>}
            { card.prices.usd_foil && <Price style={{width:"20px"}}>/</Price>}
            { card.prices.usd_foil && <Price $foil={true}>{`$${card.prices.usd_foil}`}</Price> }
        </Row>
        <CardQuantityWrap>
            {(card?.card_faces ?? false)
                    ? <>
                        <FlipCardButton data-tooltip-id={`flipCardTT${x},${y}`} onClick={() => setBackFace((prev) => !prev)}><FlipIcon height={42} src={rotate} alt="Flip Card"/></FlipCardButton>
                        <Tooltip id={`flipCardTT${x},${y}`} place="top" content="Flip Card" style={{fontSize: "1rem"}} opacity={1}/>
                    </>
                    : <Spacer/>
            }
            <AddRemoveButton onClick={(e) => cardQuantityClick(e, true)}><AddRemoveIcon draggable="false" height={36} src={minus} alt="-"/></AddRemoveButton>
            <CardQuantity>{numOfCard}</CardQuantity>
            <AddRemoveButton onClick={(e) => cardQuantityClick(e, false)}><AddRemoveIcon draggable="false" height={36} src={plus} alt="+"/></AddRemoveButton>
            {
                (card?.type_line?.includes("Basic") ?? false) 
                ? <>
                    <FillBucketButton data-tooltip-id={`fillBucket`} onClick={fillOnClick}><FillBucketIcon src={fillBucket}/></FillBucketButton>
                    <Tooltip id={`fillBucket`} place="top" content="Fill Remaining Deck" style={{fontSize: "1rem"}} opacity={1}/>
                </>
                : <Spacer/>
            }
        </CardQuantityWrap>
    </CardWrap>
};

/*
<PandPWrap>
    <PriceAndPopularity data-tooltip-id="cardPrice">$0 - $100</PriceAndPopularity>
        <Tooltip id="cardPrice" place="top" content="Price range from tcgplayer.com" style={{fontSize: "1rem"}} opacity={1}/>
        <PriceAndPopularity data-tooltip-id="cardPopularity">0.25%</PriceAndPopularity>
    <Tooltip id="cardPopularity" place="bottom" content="Used in 0.25% of eligible decks on edhrec.com" style={{fontSize: "1rem"}} opacity={1}/>
</PandPWrap>
*/

//<AddToDeckButton data-tooltip-id="addToDeckTT" onClick={() => addCardToDeckList({quantity: numOfCard, card: card})}><AddToDeckIcon height={36} src={addToDeck} alt="Add to deck"/></AddToDeckButton>
//<Tooltip id="addToDeckTT" place="top" content="Add to Deck" style={{fontSize: "1rem"}} opacity={1}/>