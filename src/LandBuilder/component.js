import { useEffect } from "react";
import styled from "styled-components";

import { Navbar } from "./1Navbar";
import { Filters } from "./2FilterColumn";
import { LandTags } from "./3Lists/1LandTags";
import { LandbaseList } from "./3Lists/2LandbaseList";
import { useCards } from "../contexts/CardContext";

const Grid = styled.div`
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

    const { mobileMenu, bigDesktop, mobileView, setMobileMenu } = useCards();
    
    useEffect(()=>{
        const callbackFunc = (e) => {
            if(!mobileView){setMobileMenu(false)}
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
        <Grid $bigDesktop={bigDesktop} $mobileView={mobileView}>
            { (!mobileView || mobileMenu) && <LandTags/>}
            { !mobileMenu && <Filters/> }
            { bigDesktop && <LandbaseList/> }
        </Grid>
    </>

};