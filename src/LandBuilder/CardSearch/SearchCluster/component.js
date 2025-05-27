import styled from "styled-components";
import { useCards } from "../../../contexts/CardContext";
import { useRef, useState } from "react";
import { debounce } from 'lodash';
import { landTags } from "../../global/landTagData";

const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Row = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: safe center;
    align-items: center;
    padding: 10px 0 10px 0;
`;

const SmallLabel = styled.label`
    font-size: 1.5rem;
    @media (max-width: 1500px) {
        font-size: 1rem;
    }
`;

const Search = styled.input`
    margin: 0 20px 0 0;
    width: 175px;
    height: 36px;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    font-size: 1.2rem;
    &::placeholder{
        font-size: 1rem;
    }
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


export const SearchClusterWrapper = ({tagMenuArr, lands=false}) => {

    const { db, setNameFilter, setOracleTextSearch, activeLBTag } = useCards();
    const nameRef = useRef();
    const oracleRef = useRef();

    const nameSubmit = () => setNameFilter(`${nameRef.current.value}+`);
    const debouncedName = debounce(nameSubmit, 1000);

    const oracleSubmit = () => setOracleTextSearch(`o:\"${oracleRef.current.value}\"+`);
    const debouncedOracle = debounce(oracleSubmit, 1000);

    return <Row>
        <Form onSubmit={(e) => {e.preventDefault()}}> 
            <Search onChange={debouncedName} placeholder="Card Name" ref={nameRef}/>
            <Search onChange={debouncedOracle} placeholder="Card Text" ref={oracleRef}/>
        </Form>
        <SmallLabel>{(db?.total_cards ?? 0) + " / " + (
            (db?.total_cards ?? false) && (db?.total_cards > (landTags?.[activeLBTag]?.totalNumber ?? 0))
                ? db?.total_cards
                : landTags?.[activeLBTag]?.totalNumber ?? 0
        )}</SmallLabel>
        {!lands && <ToggleTags $menuOpen={tagMenuArr[0]} onClick={() => {tagMenuArr[1](prev => !prev)}}>Tags</ToggleTags>}
    </Row>
}
