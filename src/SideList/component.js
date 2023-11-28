import { Fragment, useEffect, useState } from "react";
import { useCards } from "../contexts/CardContext";
import styled from "styled-components";
import checkmark from "./icons/checkmark.svg";

const ListWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0 auto;
    margin-top: 20px;
    width: 95%;
    height: calc(100% - 20px);
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
    margin: 10px auto 10px auto;
    text-align: center;
    font-weight: normal;
    font-size: 1.2rem;
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
    padding-bottom: 20px;
    border-radius: 5px;
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
    padding-left: 1.5em;
    text-indent: -1.6em;
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
const ListBorder = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 2px solid black;
    border-radius: 5px;
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
    const { fdb, cardSearch, addRemoveList, pushSeachListToDeck, numOfCopies, resetDeckList, deckList, isMidToSmallest } = useCards()

    const adjustDbToAddRemovedCard = (fdb, delim) => (
        fdb.data.reduce((acc, card) => {
            const cardName = (card?.card_faces ?? false)
                ? card.card_faces[0].name + " // " + card.card_faces[1].name
                : card.name
            const numOfCard = (addRemoveList?.[card.oracle_id] ?? numOfCopies)
            return numOfCard < 1
                ? acc
                : acc + delim + numOfCard + "x " + cardName
        },"")
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
        if(fdb)
            navigator.clipboard.writeText(
                adjustDbToAddRemovedCard(fdb, "\n")
            );
        setClipboarded(fdb)
    }

    useEffect(() => {
        setClipboarded(false);
    }, [cardSearch, setClipboarded])

    return <ListWrap>
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
                    (fdb?.data ?? false) && "Total Cards: " + 
                        (activeTab === "search"
                            ? adjustDbToAddRemovedCard(fdb, "^").split("^").slice(1).map((text)=> text.split("x")[0]).reduce((acc, num) => acc+Number(num),0)
                            : deckList.map((text)=> text.split("x")[0]).reduce((acc, num) => acc+Number(num),0)
                        )
                }</H3>
                {
                    !fdb && <ListItem>{
                        (activeTab === "search"
                            ? "Search Cards to get List"
                            : "Add Cards From Search List"
                        )
                    }</ListItem>
                }
                {
                    activeTab === "search"
                        ?(fdb?.data ?? false) && adjustDbToAddRemovedCard(fdb, "^").split("^").slice(1).map((cardName, i) => (
                            <Fragment key={`listFrag${i}`}>
                                <ListItem>{cardName}</ListItem>
                                <br/>
                            </Fragment>
                        ))
                        :(fdb?.data ?? false) && deckList && deckList.map((cardName, i) => (
                            <Fragment key={`listFrag${i}`}>
                                <ListItem>{cardName}</ListItem>
                                <br />
                            </Fragment>
                        ))
                }
            </ListBlock>
    </ListWrap>
}