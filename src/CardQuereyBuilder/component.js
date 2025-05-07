import React, { Fragment, useState } from "react";
import { SideList } from "../SideList";
import { SideListProvider } from "../contexts/SideListContext";

import { SearchCluster } from "../CardSearch/SearchCluster";
import { ColorFilters } from "../CardSearch/ColorFilters";
import { CmcFilter } from "../CardSearch/CmcFilter";
import { CardStackCluster } from "../CardSearch/CardStackCluster";
import { TagList } from "../TagList/component";
import styled from "styled-components";

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

export const CardQuereyBuilderWrapper = ({}) => {

    const tagMenuArr = useState(false);
    const [tagMenu, setTagMenu] = tagMenuArr;

    return <MiniApp $menuOpen={tagMenu}>
        {tagMenu && <Spacer/>}
            <Column>
                <ColorFilters/>
                <CmcFilter/>
                <SearchCluster tagMenuArr={tagMenuArr}/>
                <CardStackCluster/>
            </Column>
        {tagMenu && <TagList/>}
        <SideListProvider><SideList/></SideListProvider>
    </MiniApp>

};