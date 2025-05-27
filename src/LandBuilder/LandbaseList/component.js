import { Fragment, useEffect, useState } from "react";
import { useCards } from "../../contexts/CardContext";
import styled from "styled-components";
import { Donate, Trash, CardList } from "./subElements";
import checkmark from "./assets/checkmark.svg";
import 'groupby-polyfill/lib/polyfill.js'
import { useSideList } from "../../contexts/SideListContext";

const ListWrap = styled.div`
    position: sticky;
    background-color: #181a1c;
    border-radius: 5px;
    border: 2px solid #d8cc65;
    top: 20px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    box-sizing: border-box;
    width: calc(100% - 20px);
    align-self: flex-start;
    justify-self: flex-start;
    height: calc(100vh - 40px);
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
    margin: 0px auto 0px auto;
    text-align: center;
    font-weight: normal;
    font-size: 1.5rem;
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
    @media (max-width: 1000px) {
        font-size: 0.5rem;
    }
`;

const ListBlock = styled.pre`
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

const CardImg = styled.img`
    position: fixed;
    top: 50%;
    transform: translate(0, -50%);
    right: 20%;
    width: 20%;
    border-radius: calc(4.2% + 5px);
    border: solid #121010 5px;
    margin: 20px 0 0 20px;
`;

const TitleButton = styled.button`
    font-size: 1.5rem;
    height: 40px;
    width: 100%;
    border-radius: 5px;
    z-index: 10;
    border: ${props => props.$isActive ? "none" : "2px solid #121010"};
    margin: 5px 0px;
    color: #d8cc65;
    background-color: ${props => props.$isActive ? "#121010" : "transparent"};
    &:hover {
        background-color: ${props => props.$isActive ? "#121010" : "#aaaaaa"};
    }
    @media (min-width: 2000px) {
        font-size: 1.5rem;
    }
    @media (max-width: 1000px) {
        font-size: 1rem;
    }
`

const Button = styled.button`
    font-size: 1.2rem;
    padding: 3px;
    height: 36px;
    width: 80%;
    z-index: 5;
    margin: 0 auto;
    color: white;
    border-radius: 5px;
    border: 2px solid white;
    background-color: transparent;
    &:hover {
        background-color: #aaaaaa;
    }
    &:active {
        color: black;
        border-color: black;
        background-color: white;
    }
    @media (max-width: 1000px) {
        font-size: 1rem;
    }
`;

const TitleText = styled.h2`
    display: block;
    font-size: 1.5rem;
    color: #d8cc65;
    font-weight: 600;
`;

export const LandbaseWrapper = () => {

    const { db, cardSearch, combineDuplicates, setAddRemoveList, removeCardFromDeck, getNameFromCard, cardObjArrToListString, pushSeachListToDeck, resetDeckList, deckList, isMidToSmallest, adjustDbToAddRemovedCard, landBaseList, setLandBaseList, resetLandBaseList } = useCards();
    const {
        clipboarded, activeTab, confirmClear, hoverCard, backFaces,
        setClipboarded, setActiveTab, setConfirmClear, setHoverCard, setBackFaces
    } = useSideList();

    const findImage = (card) => (
        (!card?.image_uris ?? false) 
        ? card.card_faces[((backFaces[card.oracle_id] ?? false) ? 1 : 0)].image_uris.normal
        : card.image_uris.normal
    )


    const clearButton = () => {
        if(!confirmClear)
            setConfirmClear(true);
        else {
            resetLandBaseList();
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

    useEffect(() => {
        setClipboarded(false);
        setConfirmClear(false);
    }, [cardSearch, activeTab, setClipboarded, setConfirmClear])

    const activeList = db 

    return <>
        <ListWrap id="land-base-wrap">
            { hoverCard && <CardImg src={findImage(hoverCard.card)}/> }
            <Row $width={"100%"}>
                <TitleText>Landbase</TitleText>
            </Row>    
                <ListBlock>
                    <Row $width={"90%"}>
                        {activeTab === "maybe" 
                            ?<Button onClick={pushSeachListToDeck}>{"Add All"}</Button>
                            :<Button onClick={clearButton}>
                                {confirmClear
                                    ? "Confirm?"
                                    : "Clear"
                                }
                            </Button>
                        }
                        <Button onClick={copyButton}>
                            {
                                clipboarded 
                                ? <Img height={24} src={checkmark}/>
                                : "Copy"
                            }
                        </Button>
                    </Row>
                    <H3>{`Total Cards: ${
                        (landBaseList.length > 0)
                            ? landBaseList.reduce((acc, {quantity}) => acc + quantity, 0)
                            : 0
                    }`}</H3>
                    {  
                        <CardList/>
                    }
                </ListBlock>
                <Donate/>
        </ListWrap>
    </>
}