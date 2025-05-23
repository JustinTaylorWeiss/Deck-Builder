import { useCards } from "../../../contexts/CardContext";
import { useSideList } from "../../../contexts/SideListContext"
import { Fragment, useEffect, useState } from "react";
import { Trash } from "./TrashCan";
import styled from "styled-components";
import { LandbaseList } from "..";

const LIWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    margin-left: 5%;
    margin: 0 auto;
    margin-top: 10px;
    
    border: solid white 1px;
    border-radius: 2px;
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

export const CardListWrapper = () => {
    

    const { db, cardSearch, combineDuplicates, setAddRemoveList, removeCardFromDeck, getNameFromCard, cardObjArrToListString, pushSeachListToDeck, resetDeckList, deckList, isMidToSmallest, adjustDbToAddRemovedCard, landBaseList, removeCardLandBaseList } = useCards();
    const { clipboarded, activeTab, confirmClear, hoverCard, backFaces, setClipboarded, setActiveTab, setConfirmClear, setHoverCard, setBackFaces } = useSideList();

    const onListCardClick = (cardWrap) => {
        if(cardWrap?.card?.card_faces ?? false)
            setBackFaces((prev) => ({ ...prev, [cardWrap.card.oracle_id]: (!prev[cardWrap.card.oracle_id] ?? false)}))
    }

    const trashCanOnClick = (cardWrap) => () => {
        removeCardLandBaseList(cardWrap.card)
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

    const cardTypes = [
        "Battle",
        "Enchantment",
        "Artifact",
        "Land",
        "Creature",
        "Planeswalker",
        "Instant",
        "Sorcery",
    ];

    
    const activeList = landBaseList;

    return processList(activeList).map(([type, typeGroup], i) => (
        <Fragment key={`typeGroup${i}`}>
            {
                typeGroup.map((cardWrap, i) => (
                    <LIWrap key={`listFrag${i}`}>
                        <ListItem
                            $dfc={(cardWrap?.card?.card_faces ?? false)}
                            onClick={() => onListCardClick(cardWrap)}
                            onMouseOver={() => setHoverCard(cardWrap)}
                            onMouseOut={() => setHoverCard("")}
                        >{`${cardWrap.quantity}x ${getNameFromCard(cardWrap.card)}`}</ListItem>
                        <Trash trashCanOnClick={trashCanOnClick(cardWrap)}/>
                    </LIWrap>
                ))
            }
        </Fragment>
    ))
}