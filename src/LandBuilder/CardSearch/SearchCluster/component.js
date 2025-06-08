import styled from "styled-components";
import { useCards } from "../../../contexts/CardContext";
import { useRef, useState } from "react";
import { debounce } from 'lodash';
import { landTags } from "../../global/landTagData";
import { useMediaQuery } from "react-responsive";

const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    ${props => (props.$stackStuff && !props.$mobileView)
        ? "flex-direction: row;"
        : `
            flex-direction: column;
            justify-content: flex-start;
        `
    }
`;

const Row = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: safe center;
    align-items: center;
    padding: 10px 0 10px 0;
    ${props => props.$stackStuff
        ? `flex-direction: row;`
        : ``
    }
`;

const SmallLabel = styled.label`
    font-size: 1.5rem;
     ${props => props.$mobileView
        ? "padding: 0 20px;"
        : "padding: 0 20px 0 0;"
    }
    text-wrap: nowrap;
    @media (max-width: 1500px) {
        font-size: 1rem;
    }
`;

const Search = styled.input`
    margin: 0 20px 0 0;
    height: 36px;
    width: 40%;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    font-size: 1.2rem;
    ${props => props.$stackStuff ? `` : `
        margin: 3px 10px 3px 10px;
        width: 80%;
    `}
    ${props => props.$mobileView
        ? `
            margin: 5px 0;
            width: 100%;
        `
        : ""
    }
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

    const stackStuff = useMediaQuery({query: '(min-width: 1400px)'});
    const mobileView = useMediaQuery({query: '(max-width: 900px)'});

    const { db, setNameFilter, setOracleTextSearch, activeLBTag } = useCards();
    const nameRef = useRef();
    const oracleRef = useRef();

    const nameSubmit = () => setNameFilter(`${nameRef.current.value}+`);
    const debouncedName = debounce(nameSubmit, 1000);

    const oracleSubmit = () => setOracleTextSearch(`o:\"${oracleRef.current.value}\"+`);
    const debouncedOracle = debounce(oracleSubmit, 1000);

    return <>
    <Row>
        <Form $stackStuff={stackStuff} $mobileView={mobileView} onSubmit={(e) => {e.preventDefault()}}> 
            <Search $mobileView={mobileView} $stackStuff={stackStuff} onChange={debouncedName} placeholder="Card Name" ref={nameRef}/>
            <Search $mobileView={mobileView} $stackStuff={stackStuff} onChange={debouncedOracle} placeholder="Card Text" ref={oracleRef}/>
        </Form>
    </Row>
    <SmallLabel $mobileView={mobileView}>{(db?.total_cards ?? 0) + " / " + (
        (db?.total_cards ?? false) && (db?.total_cards > (landTags?.[activeLBTag]?.totalNumber ?? 0))
            ? db?.total_cards
            : landTags?.[activeLBTag]?.totalNumber ?? 0
    )}</SmallLabel>
    {!lands && <ToggleTags $menuOpen={tagMenuArr[0]} onClick={() => {tagMenuArr[1](prev => !prev)}}>Tags</ToggleTags>}
    </>
    }
