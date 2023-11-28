import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useCards } from "../../../contexts/CardContext";
import { Card } from "../../Card";

const Column = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.$columns} , 5fr);
    grid-template-rows: repeat(3, 7fr);
    grid-gap: 20px;
    margin-top: 30px;
`;

const Label = styled.label`
    font-size: 3rem;
`;

const LoadMoreButton = styled.button`
    margin: 20px 0;
    height: 3vh;
    width: 20vw;
    font-size: 1.2rem;
`;

export const AltCardStackClusterWrapper = () => {

    const { db, loading, resetAddRemoveList, loadMoreCards, cardSearch, isBig, isMid, isSmall } = useCards();
    const [numOfColumns, setNumOfColumns] = useState(3);
    //const [numOfRows, setNumOfRows] = useState();
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
        <Column $columns={numOfColumns}>
            {(db?.data ?? false) && db.data.map((card, i) => (
                    <Card key={`card${i}`} card={card} i={i}/>
            ))}
        </Column>
        { db && db.has_more && <LoadMoreButton onClick={loadMoreCards}>{loading ? "Loading..." : "Load More Results"}</LoadMoreButton> }
    </>
}