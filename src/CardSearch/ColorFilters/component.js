import React, { Fragment } from "react";
import styled from "styled-components";
import { useCards } from "../../contexts/CardContext";
import W from "./colorIcons/W.svg";
import U from "./colorIcons/U.svg";
import B from "./colorIcons/B.svg";
import R from "./colorIcons/R.svg";
import G from "./colorIcons/G.svg";
import C from "./colorIcons/C.svg";

const Img = styled.img``;
const Option = styled.option``;

const SelectColorType = styled.select`
    font-size: 1.2rem;
    padding: 5px 10px;
    margin: 10px;
    color: black;
`;

const Vl = styled.span`
    border-left: 2px solid lightgray;
    height: 40px;
    margin: 0 20px;
`;

const Label = styled.label`
    margin-right: 10px;
`;

const CheckBox = styled.input`
    width: 20px;
    height: 20px;
    margin: 10px;
`;

const Wrapper = styled.div`
    margin-top: 20px;
    font-size: 2rem;
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const SmallLabel = styled.label`
    margin-left: 30px;
    font-size: 0.9rem;
`;

const Row = styled.div`
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const ColorCheckBox  = ({colorInfo: [name, image]}) => {
    
    const { setColorOnColorFilter, colorFilter } = useCards();

    return <>
        <CheckBox checked={colorFilter[name]} name={name} type="checkbox" onChange={(e) => setColorOnColorFilter(name, e.target.checked)}/>
        <Img width="36" src={image} alt={name}/>
    </>
};

export const ColorFiltersWrapper = () => {

    const { showBannedCards, setShowBannedCards, colorFilter, setAddRemoveList, setFilterType, numOfCopies, setNumOfCopies } = useCards();

    return <Wrapper>
        <Label htmlFor="colorFilter"> Filter by </Label>
        <SelectColorType name="colorFilter" value={colorFilter.colorFilter} onChange={(e) => setFilterType(e.target.value)}>
            <Option value="colorIdentity"> Color Identity</Option>
            <Option value="color"> Color </Option>
        </SelectColorType>
        <Row>
            { [["white", W], ["blue", U], ["black", B], ["red", R], ["green", G], ["colorless", C]].map((colorInfo, i) => 
                <Fragment key={`fragment${i}`}>
                    { colorInfo[0] === "colorless" && <Vl/> }
                    <ColorCheckBox key={`colorCheckBox${i}`} colorInfo={colorInfo}/>
                </Fragment >
            )}
            <SmallLabel htmlFor="numberOfCopies"> # of Copies </SmallLabel>
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
        </Row>
    </Wrapper>
}