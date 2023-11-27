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
`;

const H3 = styled.h3`
    padding: 0;
    margin: 10px;
    font-weight: normal;
    font-size: 1.2rem;
`;

const ListBlock = styled.pre`
    background-color: #14161a;
    padding: 12px;
    width: 85%;
    min-height: 50%;
    font-size: 1.2rem;
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

export const SearchListWrapper = () => {

    const [clipboarded, setClipboarded] = useState(false);
    const { fdb, cardSearch, addRemoveList, pushSeachListToDeck, numOfCopies } = useCards()

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
        <Title>Search List</Title>
        <H3>{
            (fdb?.data ?? false) && "Total Cards: " + adjustDbToAddRemovedCard(fdb, "^").split("^").slice(1).map((text)=> text.split("x")[0]).reduce((acc, num) => acc+Number(num),0)
        }</H3>
        <Button onClick={pushSeachListToDeck}> Add to Deck </Button>
        <Button onClick={copyButton}>
            {
                clipboarded 
                ? <Img height={24} src={checkmark}/>
                : "Click to Copy"
            }
        </Button>
        <ListBlock>
            {
                !fdb && <ListItem>Search Cards to get List</ListItem>
            }
            {
                (fdb?.data ?? false) && adjustDbToAddRemovedCard(fdb, "^").split("^").slice(1).map((cardName, i) => (
                    <Fragment key={`listFrag${i}`}>
                        <ListItem>{cardName}</ListItem>
                        <br/>
                    </Fragment>
                ))
            }
        </ListBlock>
    </ListWrap>
}