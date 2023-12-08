import { Fragment, useEffect, useState } from "react";
import { useCards } from "../contexts/CardContext";
import styled from "styled-components";
import checkmark from "./icons/checkmark.svg";

const ListWrap = styled.div`
    position: sticky;
    display: flex;
    top: 0;
    right: 0;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0 auto;
    width: 95%;
    height: 100vh;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: ${props => props.$width};
    align-items: flex-start;
    margin: 0 auto;
`;

const H3 = styled.h3`
    padding: 0;
    margin: 0px auto 10px auto;
    text-align: center;
    font-weight: normal;
    font-size: 1.5rem;
    font-weight: bold;
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
    background-color: #121010;
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
    margin-bottom: 20px;
`
const ListItem = styled.span`
    display: block;
    flex-direction: column;
    justify-content: flex-start;
    font-size: 1rem;
    align-items: center;
    width: 80%;
    margin: 0 0 0 5%;
    white-space: normal;
    padding: 5px 0;
    padding-left: 2em;
    text-indent: -1.6em;
    border: solid white 1px;
    border-radius: 2px;
    &:hover {
        color: green;
    }
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

const Img = styled.img`
    transform: translate(0, 5%);
`

const CardImg = styled.img`
    position: fixed;
    top: 50%;
    transform: translate(0, -50%);
    right: 20%;
    width: 20%;
    border-radius: calc(24px + 1rem);
    border: solid black 1rem;
    margin: 20px 0 0 20px;
`;

const TitleButton = styled.button`
    font-size: 1.2rem;
    height: 40px;
    width: 100%;
    border-radius: 5px;
    z-index: 10;
    border: ${props => props.$isActive ? "none" : "2px solid #121010"};
    color: ${props => props.$isActive ? "white" : "black"};
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
    margin: 10px 0;
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
`

export const SideListWrapper = () => {

    const [clipboarded, setClipboarded] = useState(false);
    const [activeTab, setActiveTab] = useState("search");
    const [confirmClear, setConfirmClear] = useState(false);
    const [hoverCard, setHoverCard] = useState("");
    const { db, cardSearch, cardObjArrToListString, addRemoveList, pushSeachListToDeck, numOfCopies, resetDeckList, deckList, isMidToSmallest, adjustDbToAddRemovedCard } = useCards();
    
    const findImage = (card) => (
        (!card?.image_uris ?? false) 
        ? card.card_faces[0].image_uris.normal
        : card.image_uris.normal
    )

    const clearButton = () => {
        if(!confirmClear)
            setConfirmClear(true);
        else {
            resetDeckList();
            setConfirmClear(false);
        }
    }

    const copyButton = () => {
        if(db)
            navigator.clipboard.writeText(
                (activeTab === "search")
                    ? cardObjArrToListString(
                        adjustDbToAddRemovedCard(db)
                    ).reduce(
                        (acc, nameText) => acc + nameText + "\n","")
                    : deckList.map((card, i) => ((i !== 0) ? "\n" : "") + card)
            );
        setClipboarded(db)
        setTimeout(() => setClipboarded(false), 1000)
    }

    useEffect(() => {
        setClipboarded(false);
    }, [cardSearch, activeTab, setClipboarded])

    return <>
        <ListWrap>
            { hoverCard && <CardImg src={findImage(hoverCard.card)}/> }
            <Row $width={"100%"}>
                <TitleButton onClick={() => setActiveTab("search")} $isActive={activeTab === "search"}>{ (isMidToSmallest) ? "Search" : "Search List"}</TitleButton>
                <TitleButton onClick={() => setActiveTab("deck")} $isActive={activeTab === "deck"}>{ (isMidToSmallest) ? "Deck" : "Deck List"}</TitleButton>
            </Row>
                <ListBlock>
                    <Row $width={"90%"}>
                        {activeTab === "search" 
                            ?<Button onClick={pushSeachListToDeck}>{(isMidToSmallest) ? "Deck" : "To Deck" }</Button>
                            :<Button onClick={clearButton}>
                                {
                                    confirmClear
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
                    <H3>{
                        ((db?.data ?? false) || activeTab !== "search") && "Total Cards: " + ((activeTab === "search")
                            ? adjustDbToAddRemovedCard(db).length
                            : deckList.length
                        )
                    }</H3>
                    {
                        !db && activeTab === "search" && <ListItem>
                            Search Cards to get List
                        </ListItem>
                    }
                    {
                        (deckList.length < 1) && activeTab !== "search" && <ListItem>
                            Add Cards From Search List
                        </ListItem>
                    }
                    {  
                        activeTab === "search"
                            ?(db?.data ?? false) && cardObjArrToListString(
                                adjustDbToAddRemovedCard(db)
                            ).map((cardName, i) => (
                                <Fragment key={`listFrag${i}`}>
                                    <ListItem 
                                        onMouseOver={() => setHoverCard(adjustDbToAddRemovedCard(db)[i])}
                                        onMouseOut={() => setHoverCard("")}
                                    >{cardName}</ListItem>
                                    <br/>
                                </Fragment>
                            ))
                            : deckList && deckList.map((cardName, i) => (
                                <Fragment key={`listFrag${i}`}>
                                    { (i !== deckList.length-1)
                                        ? <ListItem
                                        //onMouseOver={() => setHoverCard(cardName)}
                                        //onMouseOut={() => setHoverCard("")}
                                        >{cardName}</ListItem>
                                        : <ListItem style={{color: "#217ab5"}}>{cardName}</ListItem>
                                    }
                                    <br />
                                </Fragment>
                            ))
                    }
                </ListBlock>
        </ListWrap>
    </>
}