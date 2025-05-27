import React, { Fragment, useEffect, useRef, useState } from "react";
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
    position: sticky;
    top: 0px;
    z-index: 10;
    border-bottom: 2px solid #d8cc65;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
    padding: 20px 0;
    background-color: #282c34;
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
    width: 100vw;
    grid-template-columns: ${props => props.$menuOpen ? "20vw 60vw 20vw" : "80vw 20vw"};
`;

export const LandBuilderWrapper = ({}) => {

    const tagMenuArr = useState(true);
    const [tagMenu, setTagMenu] = tagMenuArr;
    const tagListRef = useRef();
    const landListRef = useRef();

    useEffect(()=>{
        const callbackFunc = (e) => {
            const e1 = document.getElementById("land-tag-wrap");
            const e2 = document.getElementById("land-base-wrap");
            if(!e1 || !e2) { return; } 
            e1.style.height = `${window.innerHeight - 112 + Math.min(window.scrollY, 72)}px`
            e2.style.height = `${window.innerHeight - 112 + Math.min(window.scrollY, 72)}px`
        }
        window.addEventListener("scroll", callbackFunc)
        window.addEventListener("resize", callbackFunc)
        return () => { 
            window.removeEventListener("scroll", callbackFunc); 
            window.removeEventListener("resize", callbackFunc); 
        }
    }, [])

    return <>
        <Navbar/>
        <MiniApp $menuOpen={tagMenu}>
            <LandTags/>
            <Column>
                <Row>
                    <ColorFilters lands={true}/>
                    <SearchCluster lands={true} tagMenuArr={tagMenuArr}/>
                </Row>
                <CardStackCluster lands={true}/>
            </Column>
            <SideListProvider><LandbaseList/></SideListProvider>
        </MiniApp>
    </>

};