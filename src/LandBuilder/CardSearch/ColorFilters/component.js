import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useCards } from "../../../contexts/CardContext";
import W from "./colorIcons/W.svg";
import U from "./colorIcons/U.svg";
import B from "./colorIcons/B.svg";
import R from "./colorIcons/R.svg";
import G from "./colorIcons/G.svg";
import C from "./colorIcons/C.svg";

const Img = styled.img`
    margin: 2px;
`;
const Option = styled.option``;

const SelectColorType = styled.select`
    font-size: 1.35rem;
    padding: 5px 10px;
    margin: 10px 15px 10px 10px;
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

const colorFilterToUriText = (colorType, colorValues) => (
    (
        colorValues.white ||
        colorValues.blue  ||
        colorValues.black ||
        colorValues.red   ||
        colorValues.green ||
        colorValues.colorless)
            ? ( 
                (
                    colorType === "colorIdentity"
                        ? "id<%3D"
                        : "c%3D"
                ) + (
                    colorValues.colorless
                    ? "C"
                    : "" + 
                    (colorValues.white ? "W" : "") +
                    (colorValues.blue  ? "U" : "") +
                    (colorValues.black ? "B" : "") + 
                    (colorValues.red   ? "R" : "") +
                    (colorValues.green ? "G" : "")
                ) + "+"
            )
            : ""
);

const colorlessValues = {
    white: false,
    blue: false,
    black: false,
    red: false,
    green: false,
    colorless: true, 
};

export const ColorFiltersWrapper = ({lands=false}) => {

    const { setColorFilter } = useCards();

    const [colorType, setColorType] = useState("colorIdentity");
    const [colorValues, setColorValues] = useState({white: true, blue: true, black: true, red: true, green: true, colorless: false});

    const toggleOneColor = (color) => () => {
        if(color === "colorless")
            setColorValues(prev => ({
                ...colorlessValues,
                [color]: !prev[color]
            }))
        else 
            setColorValues(prev => ({
                ...prev,
                colorless: false,
                [color]: !prev[color]
            }))
    }

    useEffect(() => {
        setColorFilter(colorFilterToUriText(colorType, colorValues))
    },[setColorFilter, colorType, colorValues])

    useMemo(() => {
        if(
            !colorValues.white &&
            !colorValues.blue  &&
            !colorValues.black &&
            !colorValues.red   &&
            !colorValues.green &&
            !colorValues.colorless
        ){
            setColorValues(
                {white: false, blue: false, black: false, red: false, green: false, colorless: true}
            )
        }
    }, [colorValues])

    return <Wrapper>
        <Label htmlFor="colorFilter"> {lands ? "Colors" : "Color"} </Label>
        {!lands && <SelectColorType name="colorFilter" value={colorType} onChange={(e) => setColorType(e.target.value)}>
            <Option value="colorIdentity"> Color Identity</Option>
            <Option value="color"> Color </Option>
        </SelectColorType>}
        <Row>
            { [["white", W], ["blue", U], ["black", B], ["red", R], ["green", G], ["colorless", C]].map(([name, image], i) => 
                <Fragment key={`fragment${i}`}>
                    { name === "colorless" && <Vl/> }
                    <Column>
                        <Img width="40" src={image} alt={name}/>
                        <CheckBox checked={colorValues[name]} name={name} type="checkbox" onChange={toggleOneColor(name)}/>
                    </Column>
                </Fragment >
            )}
        </Row>
    </Wrapper>
}