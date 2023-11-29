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
    font-size: 1.35rem;
    padding: 5px 10px;
    margin: 10px;
    color: black;
`;

const Vl = styled.span`
    border-left: 2px solid lightgray;
    height: 40px;
    margin: 0 22px;
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
    margin-top: 20px;
    font-size: 2rem;
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const Column = styled.div`
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
`;

const Row = styled.div`
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const ColorCheckBox  = ({colorInfo: [name, image]}) => {
    
    const { setColorOnColorFilter, colorFilter } = useCards();

    return <Column>
        <Img width="36" src={image} alt={name}/>
        <CheckBox checked={colorFilter[name]} name={name} type="checkbox" onChange={(e) => setColorOnColorFilter(name, e.target.checked)}/>
    </Column>
};

export const ColorFiltersWrapper = () => {

    const { colorFilter,  setFilterType } = useCards();

    return <Wrapper>
        <Label htmlFor="colorFilter"> Color </Label>
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
        </Row>
    </Wrapper>
}