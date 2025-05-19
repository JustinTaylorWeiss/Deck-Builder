import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useCards } from "../../contexts/CardContext";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { SubList } from "./SubList";
import styled from "styled-components";
import 'groupby-polyfill/lib/polyfill.js'
import { Tooltip } from "react-tooltip";
import { landTags } from "../global/landTagData";

const ListWrap = styled.div`
    position: fixed;
    top: 20px;
    left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: calc(20% - 20px);
    align-self: flex-start;
    justify-self: flex-end;
    height: calc(100vh - 40px);
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: ${props => props.$width};
    align-items: flex-start;
    margin: 0 auto;
`;

const TitleButton = styled.button`
    font-size: 1.2rem;
    height: 40px;
    width: 100%;
    border-radius: 5px;
    z-index: 10;
    border: ${props => props.$isActive ? "none" : "2px solid #121010"};
    color: ${props => props.$isActive ? "white" : "black"};
    background-color: ${props => props.$isActive ? "#121010" : "transparent"};
    &:hover {
        background-color: ${props => props.$isActive ? "#121010" : "#aaaaaa"};
    }
    @media (min-width: 2000px) {
        font-size: 1.5rem;
    }
    @media (max-width: 1000px) {
        font-size: 1rem;
    }
`
const SubTitleButton = styled(TitleButton)`
    background-color: ${props => props.$isActive ? "red" : "transparent"};
    color: white;
    border-color: white;
    margin-top: 20px;
`;

const MyTooltip = styled(Tooltip)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    box-shadow: 3px 3px 7px #000000;
`;

const ListBlock = styled.pre`
    background-color: #121010;
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
    background-color: ${props => props.$isActive ? "#6ecf5b" : "transparent"};
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
        background-color: white;
        color: black;
    }
`;

const Form = styled.form`
    width: 100%;
    margin: 15px 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Search = styled.input`
    margin: 0;
    width: 90%;
    height: 36px;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    font-size: 1.2rem;
    &::placeholder{
        text-align: left;
        font-size: 1rem;
    }
`;

const TagWrap = styled.div`
    background-color: ${props => props.$added ? "#585887" : "transparent"};
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 50px;
    align-items: stretch;
    justify-content: center;
`;

const TagSideTextWrap = styled.div`
    margin-left: 5px;
    width: 15%;
    font-size: 15px;
    &:hover{
        cursor: pointer;
    }
`;

const TagSideText = styled.div`
    text-align: center;
`;

/*
    background-color: #292029;
    color: white;
    text-align: center;
    width: 20%;
    margin: 0 0 auto 0;
    border: 2px solid white;
    border-radius: 5px;
    padding: 10px 0px;
    margin-bottom: 5px;
    &:hover {
        cursor: pointer;
        background-color: white;
        color: black;
    }
`;
*/

const GroupText = styled.div`

`;

const AddAllButton = styled(LibraryAddIcon)`
    body & {
        padding: 2px 3px 5px 5px;
        display: block; 
        height: initial;
        width: initial;
    }
`;

const RemoveAllButton = styled(PlaylistRemoveIcon)`
    body & {
        padding: 2px 3px 5px 5px;
        display: block; 
        height: initial;
        width: initial;
    }
`;


export const LandTagsWrapper = () => {

    const { addToTagList, activeLBTag, setActiveLBTag, removeFromTagList, removeFromDeckWithQuery, tagList, addCardToDeckList, getCardFromName, colorFilter, resetDeckList, addToDeckFromQuery, addToLandBaseFromQuery, allLands, setDBSearch, db} = useCards();
    const [tags, setTags] = useState([]);
    const [tagsAdded, setTagsAdded] = useState([]);
    const tagSearchRef = useRef();

    /*
    const utilityLandTags = {
        "City of Brass / Mana Confluence":"mana confluence or city of brass",
        "Command Tower / Exotic Orchard":"command tower or exotic orchard or reflecting pool ",
        "Prismatic Vista / Fabled Passage":"prismatic vista or fabled passage ",
    }
        */




    const [filteredLandTags, setFilteredLandTags] = useState(Object.entries(landTags));

    useEffect(()=>{
        if(activeLBTag !== "")
            setDBSearch(landTags[activeLBTag].query + " f%3Acommander " + colorFilter)
    }, [activeLBTag, colorFilter])

    useEffect(()=>{
        resetDeckList();
        if(tags.length > 0) {
            tags.forEach((tagName)=>{
                addToLandBaseFromQuery(landTags[tagName].query + " f%3Acommander");
            })
        }
    }, [tags, colorFilter])

    const tagClick = (name) => (e) => {
        if(!tags.includes(name)) {
            setTags((prev) => [
                ...prev,
                name,
            ])
        } 
        else {
            setTags((prev) => 
                prev.filter((tag)=>tag!==name)
            )
        }
    }

    const addAllClick = (tagName) => () => {
        if(tagsAdded.includes(tagName)) {
            removeFromDeckWithQuery(landTags[tagName].query + " f%3Acommander");
            setTagsAdded((prev)=>prev.filter((name)=>name!==tagName));
        }
        else {
            setTagsAdded((prev)=>[...prev, tagName]);
            addToLandBaseFromQuery(landTags[tagName].query + " f%3Acommander");
        }
    }

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
        "Land Catagories":Object.entries(landTags).slice(0, colorSum()),
        "Popular Tags":Object.entries(landTags).slice(7, 23),
        "Extra Tags":Object.entries(landTags).slice(23)
    }

    //.sort((name1, name2) => name1.localeCompare(name2))

    return <>
        <ListWrap>
            <Row $width={"100%"}>
                <TitleButton onClick={()=>{}} $isActive={true}>Land Tags</TitleButton>
            </Row>
            <ListBlock>
                <Form onSubmit={(e) => {e.preventDefault()}}> 
                    <Search onChange={tagSearch} placeholder="Search Land Tags" ref={tagSearchRef}/>
                </Form>
                <ListBlock>
                    {
                        (tagSearchRef?.current?.value ?? "") !== ""
                            ? filteredLandTags.map(([name, _], i)=>(
                                <TagWrap key={`tag${i}`} $added={tagsAdded.includes(name)}>
                                    {
                                        tagsAdded.includes(name)
                                            ? <RemoveAllButton data-tooltip-id={`RemoveAll${i}`} onClick={addAllClick(name)}/>
                                            : <AddAllButton data-tooltip-id={`AddAll${i}`} onClick={addAllClick(name)}/>
                                    }
                                    <MyTooltip id={(tagsAdded.includes(name) ? `RemoveAll${i}` : `AddAll${i}`)} place="top" content={(tagsAdded.includes(name) ? "Remove All" : "Add All")} style={{fontSize: "1rem"}} opacity={1}/>
                                    <TagButton key={`Lands-SubButton-${i}`} $isActive={activeLBTag === name} onClick={()=>{setActiveLBTag(name)}}>{name}</TagButton>
                                </TagWrap>
                            ))
                            : Object.entries(splitTags).map(([groupName, tags], i) => (
                                <SubList key={`sublist${i}`} name={groupName} startOpen={i===1} searchRef={tagSearchRef}
                                    buttons={
                                        tags.map(([name, query], i) => (
                                            <TagWrap key={`tag${i}`} $added={tagsAdded.includes(name)}>
                                                {
                                                    groupName !== "Land Catagories" && (
                                                        tagsAdded.includes(name)
                                                            ? <RemoveAllButton data-tooltip-id={`RemoveAll${i}`} onClick={addAllClick(name)}/>
                                                            : <AddAllButton data-tooltip-id={`AddAll${i}`} onClick={addAllClick(name)}/>
                                                    )
                                                }
                                                <MyTooltip id={(tagsAdded.includes(name) ? `RemoveAll${i}` : `AddAll${i}`)} place="left" content={(tagsAdded.includes(name) ? "Remove All" : "Add All")} style={{fontSize: "1rem"}} opacity={1}/>
                                                <TagButton key={`Lands-SubButton-${i}`} $isActive={activeLBTag === name} onClick={()=>{setActiveLBTag(name)}}>{name}</TagButton>
                                            </TagWrap>
                                        ))
                                    }
                                />
                        ))
                    }
                </ListBlock>
            </ListBlock>
        </ListWrap>
    </>
}



/*
    <TagSideTextWrap onMouseEnter={()=>{setHoveredTag(name)}}>
        <TagSideText>{`${numOfCards[name]}`}</TagSideText>
        <TagSideText>cards</TagSideText>
    </TagSideTextWrap>
*/