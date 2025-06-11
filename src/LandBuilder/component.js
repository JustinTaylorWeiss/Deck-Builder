import React, { Fragment, useEffect, useRef, useState } from "react";
import { SideList } from "../SideList";
import { SideListProvider } from "../contexts/SideListContext";
import { useMediaQuery } from "react-responsive";
import { SearchCluster } from "./CardSearch/SearchCluster";
import { ColorFilters } from "./CardSearch/ColorFilters";
import { CardStackCluster } from "./CardSearch/CardStackCluster";
import styled from "styled-components";
import { LandbaseList } from "./Lists/LandbaseList";
import { LandTags } from "./Lists/LandTags";
import { useCards } from "../contexts/CardContext";
import { Navbar } from "./Navbar";
import { Block } from "@mui/icons-material";

const Spacer = styled.div``;

const LandBaseHider = styled.div``;

const Row = styled.div`
    position: sticky;
    top: 0px;
    z-index: 10;
    border-bottom: 2px solid #d8cc65;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
    padding: 20px 0;
    background-color: #282c34;
    ${ props => props.$mobileView 
        ? `
            flex-direction: column;
            padding-bottom: 10px;
            position: static;
        `
        : "flex-direction: row;"
    }
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
    grid-template-columns: ${props => 
        props.$bigDesktop 
            ? "20vw 60vw 20vw" 
            : props.$mobileView
                ? "100vw"
                : "30vw 70vw 0vw"
    };
`;

export const LandBuilderWrapper = ({}) => {

    const tagMenuArr = useState(true);
    const { searchExpanded, setSearchExpanded, mobileMenu, bigDesktop, mobileView } = useCards();
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
        <MiniApp $bigDesktop={bigDesktop} $mobileView={mobileView}>
            { (!mobileView || mobileMenu) && <SideListProvider><LandTags/></SideListProvider>}
            { !mobileMenu && <Column>
                    {
                        searchExpanded && <Row $mobileView={mobileView}>
                            <ColorFilters lands={true}/>
                            <SearchCluster lands={true} tagMenuArr={tagMenuArr}/>
                        </Row>
                    }
                    <CardStackCluster lands={true}/>
                </Column>
            }
            { bigDesktop && <SideListProvider><LandbaseList style={{display: "none"}}/></SideListProvider> }
        </MiniApp>
    </>

};