import React, { Fragment, useEffect, useState } from "react";
import { SideList } from "../SideList";
import { SideListProvider } from "../contexts/SideListContext";

import { SearchCluster } from "./CardSearch/SearchCluster";
import { ColorFilters } from "./CardSearch/ColorFilters";
import { CardStackCluster } from "./CardSearch/CardStackCluster";
import styled from "styled-components";
import { LandbaseList } from "./LandbaseList";
import { LandTags } from "./LandTags";
import { useCards } from "../contexts/CardContext";
import { Navbar } from "./Navbar";

const Spacer = styled.div``;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 20px 0;
`;

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

    return <>
        <Navbar/>
        <MiniApp $menuOpen={tagMenu}>
                <Spacer/>
                <Column>
                    <Row>
                        <ColorFilters lands={true}/>
                        <SearchCluster lands={true} tagMenuArr={tagMenuArr}/>
                    </Row>
                    <CardStackCluster lands={true}/>
                </Column>
                <LandTags/>
                <SideListProvider><LandbaseList/></SideListProvider>
        </MiniApp>
    </>

};