import React, { Fragment, useEffect, useState } from "react";
import { SideList } from "../SideList";
import { SideListProvider } from "../contexts/SideListContext";

import { SearchCluster } from "../CardSearch/SearchCluster";
import { ColorFilters } from "../CardSearch/ColorFilters";
import { CardStackCluster } from "../CardSearch/CardStackCluster";
import styled from "styled-components";
import { LandbaseList } from "./LandbaseList";
import { LandTags } from "./LandTags";
import { useCards } from "../contexts/CardContext";

const Spacer = styled.div``;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const MiniApp = styled.div`
    display: grid;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
    width: 100vw;
    grid-gap: 5px;
    grid-template-columns: ${props => props.$menuOpen ? "20vw 60vw 20vw" : "80vw 20vw"};
`;

export const LandBuilderWrapper = ({}) => {

    const tagMenuArr = useState(true);
    const [tagMenu, setTagMenu] = tagMenuArr;

    return <MiniApp $menuOpen={tagMenu}>
            <Spacer/>
            <Column>
                <ColorFilters lands={true}/>
                <SearchCluster lands={true} tagMenuArr={tagMenuArr}/>
                <CardStackCluster lands={true}/>
            </Column>
            <LandTags/>
            <SideListProvider><LandbaseList/></SideListProvider>
    </MiniApp>

};