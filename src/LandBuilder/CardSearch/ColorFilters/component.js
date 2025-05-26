import { useEffect, useMemo, useState } from "react";
import { useCards } from "../../../contexts/CardContext";
import styled from "styled-components";
import W from "./colorIcons/W.svg";
import U from "./colorIcons/U.svg";
import B from "./colorIcons/B.svg";
import R from "./colorIcons/R.svg";
import G from "./colorIcons/G.svg";

const Wrapper = styled.div`
    font-size: 2rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const ColorFilterText = styled.h3`
    margin: 0;
    font-weight: 400;
    font-size: 1.5rem;
    padding-bottom: 3px;
    text-wrap: nowrap;
`;

const Img = styled.img`
    margin: 8px;
    ${props => !props.$active 
        ? "filter: grayscale(1) brightness(0.4);"
        : "filter: drop-shadow(0px 0px 4px #d8cc65);"
    }
    &:hover {
        cursor: pointer;
        ${props => !props.$active 
        ? "filter: grayscale(1) brightness(0.4) drop-shadow(0px 0px 4px #000000);"
        : ""
    }
    }
`;

const Spacer = styled.div`
    ${props => "width: " + props.$width};
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
        setColorFilter(colorFilterToUriText("colorIdentity", colorValues))
    },[setColorFilter, colorValues])

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
        <ColorFilterText>Color Identity:</ColorFilterText>
        <Spacer $width="20px"/>
            { [["white", W], ["blue", U], ["black", B], ["red", R], ["green", G]].map(([name, image], i) => 
                    <Img width="40" src={image} alt={name} $active={colorValues[name]} onClick={toggleOneColor(name)}/>
            )}
    </Wrapper>
}

/*
        <Label htmlFor="colorFilter"> {lands ? "Colors" : "Color"} </Label>
        {!lands && <SelectColorType name="colorFilter" value={colorType} onChange={(e) => setColorType(e.target.value)}>
            <Option value="colorIdentity"> Color Identity</Option>
            <Option value="color"> Color </Option>
        </SelectColorType>}

        <Fragment key={`fragment${i}`}>
            { name === "colorless" && <Vl/> }
            <Column>
                <Img width="40" src={image} alt={name} $active={colorValues[name]} onClick={toggleOneColor(name)}/>
            </Column>
        </Fragment >

        ["colorless", C]
*/

//<CheckBox checked={colorValues[name]} name={name} type="checkbox" onChange={toggleOneColor(name)}/>