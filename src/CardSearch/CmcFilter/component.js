import React from "react";
import styled from "styled-components";
import QuestonMark from './icons/questionMark.svg';
import { useCards } from "../../contexts/CardContext";

const Option = styled.option``;

const SelectColorType = styled.select`
    font-size: 1.2rem;
    padding: 5px 10px;
    margin: 10px;
    color: black;
`;

const Img = styled.img``;

const Link = styled.a`
    width: 40px;
    height: 40px;
    margin-left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Label = styled.label`
    margin-right: 10px;
    font-size: 1.5rem;
    @media (max-width: 1500px) {
        font-size: 1rem;
    }
`;

const CheckBox = styled.input`
    width: 20px;
    height: 20px;
    margin: 10px;
`;

const Wrapper = styled.div`
    font-size: 2rem;
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const CmcText = styled.input`
    height: 30px;
    width: 70px;
    font-size: 1.5rem;
`;

const SmallLabel = styled.label`
    margin-left: 20px;
    width: 50px;
    text-align: center;
    font-size: 0.9rem;
`;

export const CmcFilterWrapper = () => {

    const { cmcFilterType, setCmcFilter, customSearch, setCustomSearch, setCmcFilterType, numOfCopies, setAddRemoveList, setNumOfCopies, showBannedCards, setShowBannedCards } = useCards();

    return <Wrapper>
        <Label htmlFor="colorFilter"> CMC </Label>
        <SelectColorType name="colorFilter" value={cmcFilterType} onChange={(e) => setCmcFilterType(e.target.value)}>
            <Option value="">       {"All"}</Option>
            <Option value="%3D">    {"="}  </Option>
            <Option value="%21%3D"> {"!="} </Option>
            <Option value="%3E">    {">"}  </Option>
            <Option value="%3C">    {"<"}  </Option>
            <Option value="%3E%3D"> {">="} </Option>
            <Option value="%3C%3D"> {"<="} </Option>
        </SelectColorType>
        <CmcText type="number" placeholder="0" onChange={(e) => setCmcFilter(Math.max(e.target.value, 0))}/>
        <SmallLabel htmlFor="numberOfCopies"> Copies </SmallLabel>
        <SelectColorType name="numberOfCopies" value={numOfCopies} onChange={(e) => {
            setAddRemoveList({});
            setNumOfCopies(Number(e.target.value))
        }}>
            <Option value={0}> 0 </Option>
            <Option value={1}> 1 </Option>
            <Option value={4}> 4 </Option>
        </SelectColorType>
        <SmallLabel htmlFor="showBannedCards"> Show Banned </SmallLabel>
        <CheckBox checked={showBannedCards} name="showBannedCards" type="checkbox" onChange={(e) => setShowBannedCards(prev => !prev)}/>
        <SmallLabel> Scryfall Syntax </SmallLabel>
        <Link href="https://scryfall.com/docs/syntax" target="_blank"><Img height={40} src={QuestonMark}/></Link>
    </Wrapper>
}