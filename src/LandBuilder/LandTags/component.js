import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useCards } from "../../contexts/CardContext";
import styled from "styled-components";
import 'groupby-polyfill/lib/polyfill.js'

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

const ListBlock = styled.pre`
    background-color: #121010;
    display: flex;
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
    margin: 0 auto;
    border: 2px solid white;
    border-radius: 5px;
    padding: 10px 20px;
    margin-bottom: 5px;
    &:hover {
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
    margin: 0 0 0 20px;
    width: 60%;
    height: 36px;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    font-size: 1.2rem;
    &::placeholder{
        text-align: center;
        font-size: 1rem;
    }
`;

export const LandTagsWrapper = () => {

    const { addToTagList, removeFromTagList, tagList, addCardToDeckList, getCardFromName, colorFilter, resetDeckList, addToDeckFromQuery} = useCards();
    const [tags, setTags] = useState([]);

    const tagSearchRef = useRef();

    const landTags = {
        "Basic Land":"t%3Abasic -t%3Asnow id>0",
        "Snow Basic Land":"t%3Abasic t%3Asnow id>0",
        "Command Tower / Exotic Orchard":"command tower or exotic orchard or reflecting pool ",
        "Fetch Land":"is%3Afetchland",
        "Prismatic Vista / Fabled Passage":"prismatic vista or fabled passage ",
        "Shock Land":"is%3Ashockland", 
        "Bond Land":"is%3Abondland", 
        "Slow Land":"is%3Aslowland", 
        "Fast Land":"is%3Afastland", 
        "Fetchable Tri Land":"t%3Aland (t:forest or t:mountain or t:island or t:swamp or t:plains) id>2", 
        "Non-Fetchable Tri Land":"is%3Atriland", 
        "Pain Land":"is%3Apainland", 
        "City of Brass / Mana Confluence":"mana confluence or city of brass",
        "Canopy Land":"is%3Acanopyland", 
        "Two Color Bounce Land":"is%3Abounceland id>1",
        "Mono Color Bounce Land":"is%3Abounceland id<2",  
        "Check Land":"is%3Acheckland", 
        "Hybrid Filter Land":"is%3Afilterland o:\"or+\"", 
        "Odyssey Filter Land":"is%3Afilterland o:/add {.}{.}\\./", 
        "Dual Land":"is%3Adual", 
        "Scry Land":"is%3Ascryland", 
        "Tango Land":"is%3Atangoland",
        "Surveil Land":"oracletag%3Acycle-dual-surveil-land",
        "Gate Land":"t%3Agate t%3Aland",
        "Cave Land":"t%3Acave t%3Aland",
        "Urza Tron Land":"urzas tower or urzas power plant or urzas mine"

    }

    const [filteredLandTags, setFilteredLandTags] = useState(Object.entries(landTags));

    useEffect(()=>{
        console.log(tags);
        resetDeckList();
        if(tags.length > 0) {
            tags.forEach((tagName)=>{
                addToDeckFromQuery(landTags[tagName] + " f%3Acommander");
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

    const filterTags = (search) => (
        setFilteredLandTags(Object.entries(landTags).filter(([tag, query])=>tag.toLowerCase().includes(search.toLowerCase())))
    )

    const tagSearch = () => filterTags(tagSearchRef.current.value);

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
                        filteredLandTags.map(([name, query], i) => (
                            <TagButton key={`Lands-SubButton-${i}`} $isActive={tags.includes(name)} onClick={tagClick(name)}>{name}</TagButton>
                        ))
                    }
                </ListBlock>
            </ListBlock>
        </ListWrap>
    </>
}