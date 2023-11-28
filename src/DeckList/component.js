import { Fragment, useEffect, useState } from "react";
import { useCards } from "../contexts/CardContext";
import styled from "styled-components";
import checkmark from "./icons/checkmark.svg";

const ListWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const Title = styled.h2`
    margin: 10px 0 0 0;
    font-size: 2.5rem;
    @media (max-width: 2000px) {
        font-size: 1.5rem;
    }
    @media (max-width: 1500px) {
    }
`;

const H3 = styled.h3`
    padding: 0;
    margin: 10px;
    font-weight: normal;
    font-size: 1.2rem;
    @media (max-width: 2000px) {
        font-size: 1rem;
    }
`;

const ListBlock = styled.pre`
    background-color: #14161a;
    padding: 20px;
    width: 85%;
    min-height: 50%;
    font-size: 1rem;
`
const ListItem = styled.span`
    display: inline-block;
    width: 100%;
    white-space: normal;
    padding-left: 1.5em;
    text-indent: -1.6em;
`;

const Img = styled.img`
    transform: translate(0, 5%);
`

const Button = styled.button`
    font-size: 1.2rem;
    padding: 3px;
    height: 36px;
    width: 80%;
    margin: 10px 0;
`

export const DeckListWrapper = () => {

    const [clipboarded, setClipboarded] = useState(false);
    const [confirmClear, setConfirmClear] = useState(false);
    const { fdb, cardSearch, deckList, resetDeckList } = useCards()

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
                deckList.reduce((acc, cardTxt) => (
                    acc + cardTxt + "\n"
                ), "")
            );
        setClipboarded(fdb)
    }

    useEffect(() => {
        setClipboarded(false);
    }, [cardSearch, setClipboarded])

    return <ListWrap>
        <Title>Deck List</Title>
        <H3>{
            (fdb?.data ?? false) && deckList && "Total Cards: " + deckList.map((text)=> text.split("x")[0]).reduce((acc, num) => acc+Number(num),0)
        }</H3>
        <Button onClick={clearButton}>
            {
                confirmClear
                    ? "Click To Confirm"
                    : "Clear Decklist"
            }
        </Button>
        <Button onClick={copyButton}>
            {
                clipboarded 
                    ? <Img height={24} src={checkmark}/>
                    : "Click to Copy"
            }
        </Button>
        <ListBlock>
            {
                !fdb && <ListItem>Add Cards From Search List</ListItem>
            }
            {
                (fdb?.data ?? false) && deckList && deckList.map((cardName, i) => {
                    return (
                        <Fragment key={`listFrag${i}`}>
                            <ListItem>{cardName}</ListItem>
                            <br />
                        </Fragment>
                    );
                })
            }
        </ListBlock>
    </ListWrap>
}