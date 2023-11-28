import { useEffect } from "react";
import { catagoryOptions } from "./catagoryOptions";
import styled from "styled-components";
import { useCards } from "../contexts/CardContext";
import Select from 'react-select';
import { ColorFilters } from "./ColorFilters";
import { CmcFilter } from "./CmcFilter";
import { Card } from "./Card";
import { SearchCluster } from "./SearchCluster";
import { CardStackCluster } from "./CardStackCluster";

const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    align-items: center;
`

const toArrayOfIntervals = (array, interval) => (
    Array(Math.ceil(array.length / interval)).fill(0).map(
        (_, i) => array.slice(i * interval, i * interval + interval)
    )
);

export const CardSearchWrapper = () => {
    const { db, cmcFilter, cmcFilterType, numOfCopies } = useCards();

    return <Column>
        <ColorFilters/>
        <CmcFilter/>
        <SearchCluster/>
        <CardStackCluster/>

        {false && <>
            <button onClick={() => console.log(cmcFilterType + " " + cmcFilter)}>Print DB</button>
            <button onClick={() => console.log(db)}>DB</button>
            <button onClick={() => console.log(numOfCopies)}>Num</button>
            <button onClick={() => console.log(toArrayOfIntervals(db.data, 5))}>Print DB</button>
            <button onClick={() => console.log(toArrayOfIntervals(db.data, 5))}>Print DB</button>
        </>}
    </Column>
}