import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useCards } from "../../../contexts/CardContext";
import { Tooltip } from 'react-tooltip';

const Option = styled.option``;

const SelectCmcType = styled.select`
    font-size: 1.2rem;
    padding: 5px 10px;
    margin: 10px;
    color: black;
`;

const SelectFormat = styled.select`
    font-size: 1.2rem;
    padding: 5px 10px;
    width: 120px;
    margin: 10px;
    color: black;
`;

const Label = styled.label`
    margin-right: 10px;
    font-size: 1.5rem;
    @media (max-width: 1500px) {
        font-size: 1rem;
    }
`;

const FormatLabel = styled.label`
    margin-left: 10px;
    width: 50px;
    text-align: center;
    font-size: 0.9rem;
`;

const SearchToMaybeLabel = styled.label`
    margin-left: 10px;
    width: 60px;
    text-align: center;
    font-size: 0.9rem;
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
    width: 50px;
    font-size: 1.5rem;
`;

const SmallLabel = styled.label`
    margin-left: 20px;
    width: 50px;
    text-align: center;
    font-size: 0.9rem;
`;

const MidLabel = styled.label`
    margin-left: 10px;
    width: 150px;
    text-align: center;
    font-size: 0.9rem;
`;

export const CmcFilterWrapper = () => {

    const { setCmcFilter, formatFilter, setFormatFilter } = useCards();

    const [cmcNum, setCmcNum] = useState(0);
    const [cmcType, setCmcType] = useState(">=");
    const [format, setFormat] = useState("Commander");

    useEffect(() => {
        setCmcFilter(`mv${cmcType}${cmcNum}+`);
    },[setCmcFilter, cmcType, cmcNum])

    useEffect(() => {
        setFormatFilter(
            format !== "all"
            ? `f:${format}+`
            : ""
        );
    },[setFormatFilter, format])




    return <Wrapper>
        <Label htmlFor="colorFilter"> Mana Value </Label>
        <SelectCmcType name="colorFilter" value={cmcType} onChange={(e) => setCmcType(e.target.value)}>
            <Option value="%3E%3D"> {">="} </Option>
            <Option value="%3D">    {"="}  </Option>
            <Option value="%21%3D"> {"!="} </Option>
            <Option value="%3C%3D"> {"<="} </Option>
            <Option value="%3E">    {">"}  </Option>
            <Option value="%3C">    {"<"}  </Option>
        </SelectCmcType>
        <CmcText type="number" value={cmcNum} onChange={(e) => setCmcNum(Math.max(e.target.value, 0))}/>
        <FormatLabel htmlFor="format"> Format </FormatLabel>
        <SelectFormat name="format" value={format} onChange={(e) => setFormat(e.target.value)}>
            <Option value="commander"> Commander </Option>
            <Option value="all"> All </Option>
            <Option value="standard"> Standard </Option>
            <Option value="historic"> Historic </Option>
            <Option value="pioneer"> Pioneer </Option>
            <Option value="modern"> Modern </Option>
            <Option value="legacy"> Legacy </Option>
            <Option value="vintage"> Vintage </Option>
            <Option value="penny"> Penny Dreadful </Option>
            <Option value="brawl"> Brawl </Option>
        </SelectFormat>
    </Wrapper>
}

/*
<SmallLabel style={{marginLeft: "10px"}} htmlFor="showQuery"> Show Query </SmallLabel>
<CheckBox checked={showQuery} name="showQuery" type="checkbox" onChange={(e) => setShowQuery(prev => !prev)}/>
*/