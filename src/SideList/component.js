import { Fragment, useEffect, useState } from "react";
import { useCards } from "../contexts/CardContext";
import styled from "styled-components";
import checkmark from "./icons/checkmark.svg";
import trash from "./icons/trash.svg";

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
    margin: 0px auto 0px auto;
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

const LIWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    margin-left: 5%;
    margin: 0 auto;
    
    border: solid white 1px;
    border-radius: 2px;
`

const PlaceholderItem = styled.span`
    font-size: 1rem;
    text-align: center;
    padding-top: 5px;
    width: 100%;
    color: gray;
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

const ListItem = styled.span`
    display: block;
    cursor: ${props => props.$dfc ? "pointer" : "auto"};
    flex-direction: column;
    justify-content: flex-start;
    font-size: 1rem;
    align-items: center;
    width: 100%;
    margin: 0 0 0 5%;
    white-space: normal;
    overflow-wrap: anywhere;
    padding: 5px 0;
    padding-left: 1.4em;
    text-indent: -1.6em;
    color: "white";
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

const TrashImg = styled.img`
    height: 15px;
    padding: 3px;
    margin: 2px 8px;
    border-radius: 3px;
    &:hover {
        background-color: #ff000066;
    }
    &:active {
        background-color: #ff0000;
    }
    @media (min-width: 2000px) {
        font-size: 45rem;
    }
    @media (max-width: 1000px) {
        font-size: 30rem;
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
    border-radius: calc(4.2% + 5px);
    border: solid #121010 5px;
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
    margin-top: 20px;
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

const TypeText = styled.h3`
    text-align: center;
    width: 100%;
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
    const [activeTab, setActiveTab] = useState("maybe");
    const [confirmClear, setConfirmClear] = useState(false);
    const [hoverCard, setHoverCard] = useState("");
    const [backFaces, setBackFaces] = useState([]);
    const { db, cardSearch, combineDuplicates, setAddRemoveList, removeCardFromDeck, getNameFromCard, cardObjArrToListString, pushSeachListToDeck, resetDeckList, deckList, isMidToSmallest, adjustDbToAddRemovedCard } = useCards();
    
    const findImage = (card) => (
        (!card?.image_uris ?? false) 
        ? card.card_faces[((backFaces[card.oracle_id] ?? false) ? 1 : 0)].image_uris.normal
        : card.image_uris.normal
    )


    const clearButton = () => {
        if(!confirmClear)
            setConfirmClear(true);
        else {
            resetDeckList();
            setConfirmClear(false);
        }
        setTimeout(() => {setConfirmClear(false)}, 2000)
    }

    const copyButton = () => {
        if(db)
            navigator.clipboard.writeText(
                (activeTab === "maybe")
                    ? cardObjArrToListString(
                        adjustDbToAddRemovedCard(db)
                    ).reduce(
                        (acc, nameText) => acc + nameText + "\n","")
                    : combineDuplicates(deckList).map((card, i) => ((i !== 0) ? "\n" : "") + getNameFromCard(card.card))
            );
        setClipboarded(db)
        setTimeout(() => {setClipboarded(false)}, 1000)
    }

    useEffect(() => {
        setClipboarded(false);
        setConfirmClear(false);
    }, [cardSearch, activeTab, setClipboarded, setConfirmClear])

    const cardTypes = [
        "Battle",
        "Enchantment",
        "Artifact",
        "Land",
        "Creature",
        "Planeswalker",
        "Instant",
        "Sorcery",
    ]

    const onListCardClick = (cardWrap) => {
        if(cardWrap?.card?.card_faces ?? false)
            setBackFaces((prev) => ({ ...prev, [cardWrap.card.oracle_id]: (!prev[cardWrap.card.oracle_id] ?? false)}))
    }

    const trashCanOnClick = (cardWrap) => {
        if (activeTab !== "maybe")
            removeCardFromDeck(cardWrap)
        else 
            setAddRemoveList((prev) => ({
                ...prev,
                [cardWrap.card.oracle_id]:0
            }))
    }

    const processList = (list) => (
        Object.entries(
            Object.groupBy(
                (activeTab === "maybe" 
                    ? adjustDbToAddRemovedCard(list)
                    : combineDuplicates(list)
                ), ({card}) => 
                    cardTypes.filter((type) => 
                        card.type_line.includes(type)
                    ).reduce((acc, type, i) => acc + ((i > 0) ? " - " : " ") + type, "")
            )
        ).sort(([key1, val1], [key2, val2]) => key1.replace("Land", "z").localeCompare(key2.replace("Land", "z")))
    )
    
    const activeList = activeTab === "maybe" 
        ? db 
        : deckList

    return <>
        <ListWrap>
            { hoverCard && <CardImg src={findImage(hoverCard.card)}/> }
            <Row $width={"100%"}>
                <TitleButton onClick={() => setActiveTab("maybe")} $isActive={activeTab === "maybe"}>{ (isMidToSmallest) ? "Maybe" : "Maybe Board"}</TitleButton>
                <TitleButton onClick={() => setActiveTab("deck")} $isActive={activeTab === "deck"}>{ (isMidToSmallest) ? "Deck" : "Deck List"}</TitleButton>
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
                        (activeTab === "maybe")
                            ? (db?.data ?? false)
                                ? adjustDbToAddRemovedCard(db).reduce((acc, {quantity}) => acc + quantity, 0)
                                : 0
                            : (deckList.length > 0)
                                ? deckList.reduce((acc, {quantity}) => acc + quantity, 0)
                                : 0
                    }`
                    }</H3>
                    {!db && activeTab === "maybe" && <PlaceholderItem $lastItem={true}>
                        Search Cards to maybe board
                    </PlaceholderItem>}
                    {(deckList.length < 1) && activeTab !== "maybe" && <PlaceholderItem $lastItem={true}>
                        Add Cards From Maybe Board
                    </PlaceholderItem>}
                    {  
                        activeList && 
                        (activeTab !== "maybe" || (db?.data ?? false)) && 
                        processList(activeList).map(([type, typeGroup], i) => (
                            <Fragment key={`typeGroup${i}`}>
                                <TypeText>{`${type} (${typeGroup.reduce((acc, {quantity}) => acc + quantity, 0)})`}</TypeText>
                                {
                                    typeGroup.map((cardWrap, i) => (
                                        <LIWrap key={`listFrag${i}`}>
                                            <ListItem
                                                $dfc={(cardWrap?.card?.card_faces ?? false)}
                                                onClick={() => onListCardClick(cardWrap)}
                                                onMouseOver={() => setHoverCard(cardWrap)}
                                                onMouseOut={() => setHoverCard("")}
                                            >{`${cardWrap.quantity}x ${getNameFromCard(cardWrap.card)}`}</ListItem>
                                        <TrashImg src={trash} onClick={() => trashCanOnClick(cardWrap)}/>
                                        </LIWrap>
                                    ))
                                }
                            </Fragment>
                        ))
                    }
                </ListBlock>
        </ListWrap>
    </>
}