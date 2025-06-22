import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useCards } from "../../../contexts/CardContext";
import { SubList } from "./SubList";
import { landTags } from "../../global/landTagData";
import { Tooltip } from "react-tooltip";
import { LandbaseList } from "../2LandbaseList";
import 'groupby-polyfill/lib/polyfill.js'

import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

export const ListWrap = styled.div`
    position: sticky;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: flex-start;
    justify-self: flex-end;
    box-sizing: border-box;
    background-color: #181a1c;
    border: 2px solid #d8cc65;
    border-radius: 5px;
    margin-top: 20px;
    top: 20px;
    width: calc(100% - 20px);
    height: calc(100svh - 40px);
    min-height: 500px;
    ${props => props.$mobileMenu
        ? `
            justify-self: center;
            margin-top: 10px;
            height: calc(100vh - 80px);
        `
        : ""
    }
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: ${props => props.$width};
    align-items: center;
`;

const SmallRow = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    align-items: center;
`;

const Line = styled.hr`
    width: 30%;
    height: 3px;
    margin: 0;
    margin-bottom: 15px;
    border-radius: 2px;
    border-width: 0px;
    background-color: transparent;
    transition: 750ms;
    ${props => props.$active 
        ? `background-color: #d8cc65`
        : ""
    }
`;

const TitleText = styled.h2`
    display: block;
    font-size: 1.5rem;
    color: #d8cc65;
    font-weight: 600;
    padding: 10px 10px;
    width: 50%;
    text-align: center;
    margin: 5px 5px 0 5px;
    border-radius: 5px;
    box-sizing: border-box;
    background-color: transparent;
    ${props => (!props.$active || props.$bigDesktop) && `color: black;`}
    ${props => props.$bigDesktop && `color: #d8cc65;`}
    &:hover{
        ${props => (props.bigDesktop || props.$active) ? "" : `
            background-color: #a1952d;
            color: black;
            cursor: pointer;
        `}
    }
`;

const MyTooltip = styled(Tooltip)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    box-shadow: 3px 3px 7px #000000;
`;

const ListBlock = styled.div`
    display: flex;
    overflow-x: hidden;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    min-height: 50%;
    font-size: 1rem;
    margin: 0;
    overflow-y: scroll;
    border-radius: 5px;
`;

const TagButton = styled.button`
    background-color: ${props => props.$isActive ? "#43a047" : "transparent"};
    transition-duration: 150ms;
    color: white;
    width: 80%;
    margin: 0;
    text-align:left;
    border: 2px solid white;
    border-radius: 5px;
    padding: 10px 20px;
    margin: 3px 0;
    &:hover {
        cursor: pointer;
        background-color: ${props => props.$isActive ? "#43a047" : "white"};
        color: ${props => props.$isActive ? "white" : "black"};
    }
    @media (min-width: 2000px) {
        font-size: 1.5rem;
    }
    @media (max-width: 1500px) {
        font-size: 0.7rem;
    }
    @media (max-width: 1000px) {
        font-size: 0.5rem;
    }
`;

const Form = styled.form`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Search = styled.input`
    margin: 0;
    width: 80%;
    height: 36px;
    padding: 0 0.5rem;
    margin-bottom: 20px;
    font-size: 1.2rem;
    &::placeholder{
        text-align: left;
        font-size: 1rem;
    }
`;

const TagWrap = styled.div`
    transition-duration: 150ms;
    background-color: ${props => props.$added ? "#a1952d" : "transparent"};
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 50px;
    align-items: stretch;
    justify-content: center;
`;

const AddAllButton = styled(LibraryAddIcon)`
    margin: 3px;
    body & {
        padding: 2px 3px 5px 5px;
        display: block; 
        height: initial;
        width: 50px;
    }
    &:hover{
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 10px;
        cursor: pointer;
    }
`;

const RemoveAllButton = styled(PlaylistRemoveIcon)`
    margin: 2px;
    body & {
        padding: 2px 3px 5px 5px;
        display: block; 
        height: initial;
        width: 50px;
    }
    &:hover{
        background-color: rgba(0, 0, 0, 0.8);
        border-radius: 10px;
        cursor: pointer;
    }
`;


export const LandTagsWrapper = ({}) => {

    const { activeLBTag, setActiveLBTag, removeFromDeckWithQuery, colorFilter, addToLandBaseFromQuery, setDBSearch, addAllTags, setAddAllTags, mobileMenu, mobileView, bigDesktop } = useCards();
    const [tags, setTags] = useState([]);
    const [scroll, setScroll] = useState(0);
    const tagSearchRef = useRef();
    const [toggleList, setToggleList] = useState(false);

    const [filteredLandTags, setFilteredLandTags] = useState(Object.entries(landTags));

    useEffect(()=>{
        if(activeLBTag !== "") {
            if(Object.keys(fakeColorIdentities).includes(activeLBTag)) {
                setDBSearch(handleFakeColorIdentity(colorFilter, activeLBTag) + " f%3Acommander");
            }
            else {
                setDBSearch(landTags[activeLBTag].query + " f%3Acommander " + colorFilter)
            }
        }
    }, [activeLBTag, colorFilter])

    useEffect(()=>{
        if(tags.length > 0) {
            tags.forEach((tagName)=>{
                addToLandBaseFromQuery(landTags[tagName].query + " f%3Acommander");
            })
        }
    }, [tags, colorFilter])

    const addAllClick = (tagName) => () => {
        if(addAllTags.includes(tagName)) {
            removeFromDeckWithQuery(landTags[tagName].query + " f%3Acommander");
            setAddAllTags((prev)=>prev.filter((name)=>name!==tagName));
        }
        else {
            setAddAllTags((prev)=>[...prev, tagName]);
            if(Object.keys(fakeColorIdentities).includes(tagName)) {
                addToLandBaseFromQuery(handleFakeColorIdentity(colorFilter, tagName) + " f%3Acommander");
            }
            else {
                addToLandBaseFromQuery(landTags[tagName].query + " f%3Acommander");
            }
        }
    }

    const fakeColorIdentities = {
        "Dual Fetch Land": "is:fetchland",
        "Dual Slow Fetch Land": "s:MIR t:land o:search",
        "Tri Alara Fetch Land": "otag:cycle-ala-panorama",
        "Tri New Capenna Fetch Land": "otag:cycle-snc-fetchland"
    }

    const handleFakeColorIdentity = (colorFilter, tagName) => (
        (
            fakeColorIdentities[tagName] + " (" +
            (colorFilter.includes("W") ? "o:Plains or "   : "") +
            (colorFilter.includes("U") ? "o:Island or "   : "") +
            (colorFilter.includes("B") ? "o:Swamp or "    : "") +
            (colorFilter.includes("R") ? "o:Mountain or " : "") +
            (colorFilter.includes("G") ? "o:Forest or "   : "")
        ).slice(0,-4) + ")"
    )

    const filterTags = (search) => (
        setFilteredLandTags(
            Object.entries(landTags).filter(
                ([tag, query])=>tag.toLowerCase().includes(search.toLowerCase())
            )
        )
    )

    const tagSearch = () => filterTags(tagSearchRef.current.value);

    const colorSum = () => { 
        const value = 2 +
        (colorFilter.includes("W") ? 1 : 0) +
        (colorFilter.includes("U") ? 1 : 0) +
        (colorFilter.includes("B") ? 1 : 0) +
        (colorFilter.includes("R") ? 1 : 0) +
        (colorFilter.includes("G") ? 1 : 0)

        return (value === 4 || value === 5)
            ? value + 1
            : value
    }

    const splitTags = {
        "Land Categories":Object.entries(landTags).slice(0, colorSum()),
        "Popular Tags":Object.entries(landTags).slice(7, 29),
        "Extra Tags":Object.entries(landTags).slice(29)
    }

    useEffect(() => {
        setScroll(window.scrollY);
    },[window.scrollY])

    const noAddAll = [
        "Colorless Land",
        "Any Color Land",
        "One Color Land",
        "Two Color Mana Fix Land",
        "Two Color Utlity Land",
        "Three Color Land",
        "Four Color Land",
        "Five Color Land",
    ]

    useEffect(()=>{
        const callbackFunc = (e) => { if(bigDesktop) {setToggleList(false);}}
        window.addEventListener("resize", callbackFunc)
        return () => { window.removeEventListener("resize", callbackFunc); }
    }, [])

    return <ListWrap $mobileMenu={mobileMenu} $scroll={scroll} id="land-tag-wrap">
        <Row $width={"100%"}>
            <TitleText onClick={()=>{setToggleList(false)}} $bigDesktop={bigDesktop} $active={!toggleList}>Land Tags</TitleText>
            { !bigDesktop && <>
                <TitleText onClick={()=>{setToggleList(true)}} $bigDesktop={bigDesktop} $active={toggleList}>Land Base</TitleText>
            </>} 
        </Row>
        { !bigDesktop && <SmallRow>
            <Line $active={!toggleList}/>
            <Line $active={toggleList}/>
        </SmallRow>}
        { toggleList && !bigDesktop
            ? <LandbaseList headless={true}/>
            : <>
            <Form onSubmit={(e) => {e.preventDefault()}}> 
                <Search onChange={tagSearch} placeholder="Search Land Tags" ref={tagSearchRef}/>
            </Form>
            <ListBlock>
                {
                    (tagSearchRef?.current?.value ?? "") !== ""
                        ? filteredLandTags.map(([name, _], i)=>(
                            <TagWrap key={`tag${i}`} $added={addAllTags.includes(name)}>
                                {
                                    !noAddAll.includes(name)
                                        && (
                                            addAllTags.includes(name)
                                                ? <RemoveAllButton data-tooltip-id={`RemoveAll${name}`} onClick={addAllClick(name)}/>
                                                : <AddAllButton data-tooltip-id={`AddAll${name}`} onClick={addAllClick(name)}/>
                                        )
                                    }
                                { !mobileView && <MyTooltip id={(addAllTags.includes(name) ? `RemoveAll${i}` : `AddAll${i}`)} place="top" content={(addAllTags.includes(name) ? "Remove All" : "Add All")} style={{fontSize: "1rem"}} opacity={1}/> }
                                <TagButton key={`Lands-SubButton-${i}`} $isActive={activeLBTag === name} onClick={()=>{setActiveLBTag(name)}}>{name}</TagButton>
                            </TagWrap>
                        ))
                        : Object.entries(splitTags).map(([groupName, tags], i) => (
                            <SubList key={`sublist${i}`} name={groupName} startOpen={i===1} searchRef={tagSearchRef}
                                buttons={
                                    tags.map(([name, query], i) => (
                                        <TagWrap key={`tag${i}`} $added={addAllTags.includes(name)}>
                                            {
                                                !noAddAll.includes(name)
                                                    && (
                                                        addAllTags.includes(name)
                                                            ? <RemoveAllButton data-tooltip-id={`RemoveAll${i}`} onClick={addAllClick(name)}/>
                                                            : <AddAllButton data-tooltip-id={`AddAll${i}`} onClick={addAllClick(name)}/>
                                                    )
                                            }
                                            { !mobileView && <MyTooltip id={(addAllTags.includes(name) ? `RemoveAll${i}` : `AddAll${i}`)} place="left" content={(addAllTags.includes(name) ? "Remove All" : "Add All")} style={{fontSize: "1rem"}} opacity={1}/> }
                                            <TagButton key={`Lands-SubButton-${i}`} $isActive={activeLBTag === name} onClick={()=>{setActiveLBTag(name)}}>{name}</TagButton>
                                        </TagWrap>
                                    ))
                                }
                            />
                    ))
                }
            </ListBlock>
        </>}
    </ListWrap>
}
