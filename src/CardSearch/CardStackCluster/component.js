import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useCards } from "../../contexts/CardContext";
import { Card } from "../Card";

const Column = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.$columns} , 5fr);
    grid-template-rows: repeat(1, 7fr);
    grid-gap: 20px;
    margin-top: 20px;
`;

const Label = styled.label`
    font-size: 3rem;
`;

const SmallLabel = styled.label`
    margin-top: 10px;
    font-size: 2rem;
`;


const LoadMoreButton = styled.button`
    margin: 20px 0;
    height: 3vh;
    width: 20vw;
    font-size: 1.2rem;
`;

const Spacer = styled.div`
    height: 20px;
    width: 100%;
`;

export const CardStackClusterWrapper = () => {

    const { db, loading, resetAddRemoveList, loadMoreCards, cardSearch, isBig, isMid, isSmall, firstLoad } = useCards();
    const [numOfColumns, setNumOfColumns] = useState(3);
    useEffect(() => { resetAddRemoveList() },[cardSearch, resetAddRemoveList])

    useEffect(() => {
        setNumOfColumns(
            isBig
                ? 5
                : isMid
                    ? 4
                    : isSmall
                        ? 3
                        : 2
        )
    },[isBig, isMid, isSmall, setNumOfColumns])


    return <>
        { loading && <Label>Loading...</Label> }
        {(db?.data?.length ?? 0) < 1
            ? <SmallLabel>{firstLoad ? "Use filters to find cards" : "No Cards Found"}</SmallLabel>
            : <>
                <Column $columns={numOfColumns}>
                    {(db?.data ?? false) && db.data.map((card, i) => (
                            <Card key={`card${i}`} card={card} i={i}/>
                    ))}
                </Column>
                { db && db.has_more && <LoadMoreButton onClick={loadMoreCards}>{loading ? "Loading..." : "Load More Results"}</LoadMoreButton> }
                <Spacer/>
            </>
        }
    </>
}