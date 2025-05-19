import styled from "styled-components";
import { useCards } from "../../../contexts/CardContext";
import Select from 'react-select';
import { categoryOptions } from "../categoryOptions";
import QuestonMark from './icons/questionMark.svg';
import { useRef, useState } from "react";
import { Tooltip } from 'react-tooltip';
import { debounce } from 'lodash';
import { landTags } from "../../global/landTagData";

const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Img = styled.img`
    &:hover{
        padding: 3px;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
    }
    &:active {
        background-color: rgba(255, 255, 255, 0.6);
    }
`;

const Link = styled.a`
    width: 40px;
    height: 40px;
    margin-left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;


const CategorySearch = styled(Select)`
    width: 180px;
    font-size: 1rem;
    color: black;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: safe center;
    align-items: center;
    width: 100%;
    padding: 10px 0 10px 0;
`;

const ScrollRow = styled(Row)`
    overflow-x: scroll;
    width: 70%;
`;

const SmallLabel = styled.label`
    font-size: 1.5rem;
    @media (max-width: 1500px) {
        font-size: 1rem;
    }
`;

const Search = styled.input`
    margin: 0 0 0 20px;
    width: 150px;
    height: 36px;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    font-size: 1.2rem;
    &::placeholder{
        font-size: 1rem;
    }
`;

const SubmitButton = styled.input`
    margin: 0 20px 0 -81px;
    height: 40px;
    width: 80px;
    border: 0;
    font-size: 1rem;
    border-radius: 3px;
`;

const H3 = styled.h3`
    display: block;
    font-weight: normal;
    font-size: 1.5rem;
    margin: 0;
    padding: 0;
    color: gray;
`;

const Pre = styled.pre`
    background-color: #121010;
    border-radius: 5px;
    padding: 5px 10px;
    margin: 0;
    overflow-x: scroll;
`;

const ToggleTags = styled.button`
    background-color: ${props => props.$menuOpen ? "blue" : "transparent"};
    color: white;
    border: 2px solid white;
    border-radius: 5px;
    margin-left: 20px;
    padding: 10px 20px;
    &:hover {
        background-color: white;
        color: black;
    }
`;

const ActiveTags = styled.button`
    word-break: keep-all;
    background-color: transparent;
    border-radius: 5px;
    color: white;
    padding: 10px;
    &:hover {
        color: red;
        border-color: red;
    }
`;


export const SearchClusterWrapper = ({tagMenuArr, lands=false}) => {

    const { db, setNameFilter, setOracleTextSearch, tagList, removeFromTagList, activeLBTag } = useCards();
    const nameRef = useRef();
    const oracleRef = useRef();

    const nameSubmit = () => setNameFilter(`${nameRef.current.value}+`);
    const debouncedName = debounce(nameSubmit, 1000);

    const oracleSubmit = () => setOracleTextSearch(`o:\"${oracleRef.current.value}\"+`);
    const debouncedOracle = debounce(oracleSubmit, 1000);

    return <Row>
        <SmallLabel>{(db?.total_cards ?? 0) + " / " + (landTags?.[activeLBTag]?.totalNumber ?? 0)}</SmallLabel>
        <Form onSubmit={(e) => {e.preventDefault()}}> 
            <Search onChange={debouncedName} placeholder="Card Name" ref={nameRef}/>
            <Search onChange={debouncedOracle} placeholder="Card Text" ref={oracleRef}/>
        </Form>
        {!lands && <ToggleTags $menuOpen={tagMenuArr[0]} onClick={() => {tagMenuArr[1](prev => !prev)}}>Tags</ToggleTags>}
    </Row>
}
