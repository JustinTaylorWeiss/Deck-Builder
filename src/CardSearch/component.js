import { useEffect } from "react";
import { catagoryOptions } from "./catagoryOptions";
import styled from "styled-components";
import { useCards } from "../contexts/CardContext";
import Select from 'react-select';
import { ColorFilters } from "./ColorFilters";
import { CmcFilter } from "./CmcFilter";
import { Card } from "./Card";

const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    align-items: center;
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 30px 0 20px 0;
`;

const Label = styled.label`
    font-size: 3rem;
`;

const SmallLabel = styled.label`
    font-size: 1rem;
`;

const Search = styled.input`
    margin: 0 60px 0 20px;
    width: 25vw;
    height: 36px;
    font-size: 1.2rem;
`;

const LoadMoreButton = styled.button`
    margin-top: 20px;
    height: 3vh;
    width: 10vw;
    font-size: 1.2rem;
`;

const CatagorySearch = styled(Select)`
    width: 15vw;
    height: 36px;
    font-size: 1.2rem;
    color: black;
`;

const toArrayOfIntervals = (array, interval) => (
    Array(Math.ceil(array.length / interval)).fill(0).map(
        (_, i) => array.slice(i * interval, i * interval + interval)
    )
);

export const CardSearchWrapper = () => {
    const { db, loading, resetAddRemoveList, loadMoreCards, cmcFilter, cmcFilterType,  setCatagorySearch, numOfCopies, cardSearch,  setCardSearch } = useCards();

    useEffect(() => { resetAddRemoveList() },[cardSearch, resetAddRemoveList])

    return <Column>
        <ColorFilters/>
        <CmcFilter/>
        <Row>
            <SmallLabel>{"Results: " + (db?.data?.length ?? 0) + " / " + (db?.total_cards ?? 0)}</SmallLabel>
            <Search placeholder="Card Name" onChange={(e) => setCardSearch(e.target.value)}/>
            <CatagorySearch placeholder="Select Catagory..." onChange={(e) => setCatagorySearch(e.value)} options={catagoryOptions} />
        </Row>
        <Column>
            { loading && <Label>Loading...</Label> }
            { (db?.data ?? false) && toArrayOfIntervals(db.data, 5).map((section, x) => (
                <Row key={`row${x}`}>
                    { section.map(
                        (card, y) => 
                        <Card key={`card${x},${y}`} card={card} x={x} y={y}/>
                    )}
                </Row>)
            )}
            { db && db.has_more && <LoadMoreButton onClick={loadMoreCards}>{loading ? "Loading..." : "Load More Results"}</LoadMoreButton> }
        </Column>
        {/*
            <button onClick={() => console.log(cmcFilterType + " " + cmcFilter)}>Print DB</button>
            <button onClick={() => console.log(db)}>DB</button>
            <button onClick={() => console.log(numOfCopies)}>Num</button>
            <button onClick={() => console.log(toArrayOfIntervals(db.data, 5))}>Print DB</button>
            <button onClick={() => console.log(toArrayOfIntervals(db.data, 5))}>Print DB</button>
        */}
    </Column>
}