import React, { useEffect } from "react";
import styled from "styled-components";
import Select from "react-select";
import { useCards } from "../../contexts/CardContext";
import { Card } from "../Card";

const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    align-items: center;
`

const Row = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    margin: 30px 0 20px 0;
    @media (max-width: 1500){
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`;

const Label = styled.label`
    font-size: 3rem;
`;

const LoadMoreButton = styled.button`
    margin-top: 20px;
    height: 3vh;
    width: 10vw;
    font-size: 1.2rem;
`;

const toArrayOfIntervals = (array, interval) => (
    Array(Math.ceil(array.length / interval)).fill(0).map(
        (_, i) => array.slice(i * interval, i * interval + interval)
    )
);

export const CardStackClusterWrapper = () => {

    const { db, loading, resetAddRemoveList, loadMoreCards, cardSearch } = useCards();
    useEffect(() => { resetAddRemoveList() },[cardSearch, resetAddRemoveList])

    return <Column>
        { loading && <Label>Loading...</Label> }
        { (db?.data ?? false) && toArrayOfIntervals(db.data, (window.matchMedia("(max-width: 2000px)").matches ? 5 : 5)).map((section, x) => (
            <Row key={`row${x}`}>
                { section.map(
                    (card, y) => 
                    <Card key={`card${x},${y}`} card={card} x={x} y={y}/>
                )}
            </Row>)
        )}
        { db && db.has_more && <LoadMoreButton onClick={loadMoreCards}>{loading ? "Loading..." : "Load More Results"}</LoadMoreButton> }
    </Column>
}