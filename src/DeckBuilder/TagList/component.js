import { Fragment, useEffect, useRef, useState } from "react";
import { useCards } from "../../contexts/CardContext";
import styled from "styled-components";
import { Donate, Trash, CardList } from "./subElements";
import checkmark from "./assets/checkmark.svg";
import 'groupby-polyfill/lib/polyfill.js'
import { SubList } from "./SubList";

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
`

const H3 = styled.div`
    width: 100%;
    text-align: center;
    padding: 20px 0;
    font-size: 1.25rem;
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

const TypeInputWrap = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: ${props => props.$isActive ? "#6ecf5b" : "transparent"};
    color: white;
    width: 80%;
    margin: 0 auto;
    border: 2px solid white;
    border-radius: 5px;
    padding: 10px 20px;
`;

const TypeInputButton = styled.button`
    background-color: transparent;
    color: white;
    width: 40%;
    margin: 0 auto;
    border: 2px solid white;
    border-radius: 5px;
    padding: 5px 0px;
    &:hover {
        background-color: white;
        color: black;
    }
`;

const ButtonInputLabel = styled.label`
    display: block;
    padding-bottom: 10px;
`;

const ButtonInput = styled.input`
    width: 80%;
    margin-bottom: 10px;
`;

export const TagList = () => {

    const { addToTagList, removeFromTagList, tagList} = useCards();
    const [activeTab, setActiveTab] = useState("cardType");
    const [notToggle, setNotToggle] = useState(false);

    const creatureTypeRef = useRef();
    const customSubTypeRef = useRef();

    const isInList = (tagName) => !!tagList.find(
        (tag) => (
            tag.name === tagName 
            && tag.not === notToggle
        )
    )

    const tagButtonOnClick = (tag) => (e) => {
        if(!isInList(tag.name))
            addToTagList(tag)
        else 
            removeFromTagList(tag.name)
    }

    return <>
        <ListWrap>
            <Row $width={"100%"}>
                <TitleButton onClick={() => setActiveTab("cardType")} $isActive={activeTab === "cardType"}>Card Type</TitleButton>
                <TitleButton onClick={() => setActiveTab("customTags")} $isActive={activeTab === "customTags"}>Custom Tags</TitleButton>
            </Row>
            <ListBlock>
                <Row $width={"80%"}><SubTitleButton onClick={() => setNotToggle(prev => !prev)} $isActive={notToggle}>Not Card Type</SubTitleButton></Row>
                {
                    activeTab === "cardType" && <>
                            <H3>Special Types</H3>
                            <TagButton $isActive={isInList("Commander")} onClick={tagButtonOnClick({name: "Commander", not:notToggle, filters: [`is:Commander+`]})}>{(notToggle ? "Non-" : "") + "Commander"}</TagButton>
                            <TagButton $isActive={isInList("Split Card")} onClick={tagButtonOnClick({name: "Split Card", not:notToggle, filters: [`is:\"Split Card\"+`]})}>{(notToggle ? "Non-" : "") + "Split Card"}</TagButton>
                            <TagButton $isActive={isInList("DFC")} onClick={tagButtonOnClick({name: "DFC", not:notToggle, filters: [`is:DFC+`]})}>{(notToggle ? "Non-" : "") + "DFC"}</TagButton>
                            <TagButton $isActive={isInList("MDFC")} onClick={tagButtonOnClick({name: "MDFC", not:notToggle, filters: [`is:MDFC+`]})}>{(notToggle ? "Non-" : "") + "MDFC"}</TagButton>
                            <H3>Supertypes</H3>
                            {["Legendary", "Snow", "Basic"].map((name, i) => 
                                <TagButton $isActive={isInList(name)} key={`SuperTypeKey-${i}`} onClick={tagButtonOnClick({name: name, not:notToggle, 
                                    filters: [`t:${name}+`]})}>{(notToggle ? "Non-" : "") + name}</TagButton>
                            )}
                            <H3>Card Types</H3>
                            {["Creature", "Land", "Artifact", "Enchantment", "Planeswalker", "Battle", "Instant", "Sorcery"].map((name, i) => 
                                <TagButton $isActive={isInList(name)} key={`TypeKey-${i}`} onClick={tagButtonOnClick({name: name, not:notToggle, 
                                    filters: [`t:${name}+`]})}>{(notToggle ? "Non-" : "") + name}</TagButton>
                            )}
                            <H3>Subtypes</H3>
                            <TypeInputWrap>
                                <ButtonInputLabel>{(notToggle ? "Non-" : "") + "Creature Type"}</ButtonInputLabel>
                                <ButtonInput ref={creatureTypeRef}/>
                                <TypeInputButton $isActive={isInList("Creature Type")} onClick={tagButtonOnClick({name: customSubTypeRef.current, not:notToggle, 
                                    filters: [`t:${customSubTypeRef.current}+`]})}>Add</TypeInputButton>
                            </TypeInputWrap>
                            <TypeInputWrap>
                                <ButtonInputLabel>{(notToggle ? "Non-" : "") + "Custom Subtype"}</ButtonInputLabel>
                                <ButtonInput ref={customSubTypeRef}/>
                                <TypeInputButton $isActive={isInList("Subtype")} onClick={tagButtonOnClick({name: customSubTypeRef.current, not:notToggle, 
                                    filters: [`t:${customSubTypeRef.current}+`]})}>Add</TypeInputButton>
                            </TypeInputWrap>
                        </>
                }
                {
                    activeTab === "customTags" && <ListBlock>
                        <SubList name="Lands" buttons={[
                            ["Fetchland", "Shockland", "Fastland", "Slowland", "Triome", "Triland", "Canopyland", "Painland", "Bounceland", "Checkland", "Filterland", "Dual", "Scryland", "Tangoland"].map((name, i) => (
                                <TagButton key={`Lands-SubButton-${i}`} $isActive={isInList(name)} onClick={tagButtonOnClick({name: name, not:notToggle, 
                                    filters: [`is:${name}+`]})}>{(notToggle ? "Non-" : "") + name}</TagButton>
                            ))
                        ]}/>
                        <SubList name="Archetypes" buttons={[
                            ["Each Player Votes"].map((name, i) => (
                                <TagButton key={`Lands-SubButton-${i}`} $isActive={isInList(name)} onClick={tagButtonOnClick({name: name, not:notToggle, 
                                    filters: [`o:\"${name}\"+`]})}>{(notToggle ? "Non-" : "") + name}</TagButton>
                            ))
                        ]}/>
                        <SubList name="Keywords" buttons={[
                            ["Mill", "Affinity", "Cycling", "Landfall", "Madness", "Suspend", "Paradox", "Devotion"].map((name, i) => (
                                <TagButton key={`Lands-SubButton-${i}`} $isActive={isInList(name)} onClick={tagButtonOnClick({name: name, not:notToggle, 
                                    filters: [`o:${name}+`]})}>{(notToggle ? "Non-" : "") + name}</TagButton>
                            ))
                        ]}/>
                        <SubList name="Synergies" buttons={[
                            [].map((name, i) => (
                                <TagButton key={`Lands-SubButton-${i}`} $isActive={isInList(name)} onClick={tagButtonOnClick(name, [{type: "is", not:notToggle, value: name}])}>{(notToggle ? "Non-" : "") + name}</TagButton>
                            ))
                        ]}/>
                    </ListBlock>
                }
            </ListBlock>
        </ListWrap>
    </>
}