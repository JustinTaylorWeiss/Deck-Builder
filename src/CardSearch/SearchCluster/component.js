import styled from "styled-components";
import { useCards } from "../../contexts/CardContext";
import Select from 'react-select';
import { categoryOptions } from "../categoryOptions";
import { useRef } from "react";

const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CategorySearch = styled(Select)`
    width: 200px;
    font-size: 1rem;
    color: black;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 0 10px 0;
`;

const SmallRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const SmallLabel = styled.label`
    font-size: 1.5rem;
    @media (max-width: 1500px) {
        font-size: 1rem;
    }
`;

const Search = styled.input`
    margin: 0 0 0 20px;
    width: calc(290 - calc(81px + 0.5rem));
    height: 36px;
    padding-left: 0.5rem;
    padding-right: calc(81px + 0.5rem);
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


export const SearchClusterWrapper = () => {

    const { db, setCategorySearch, setCardSearch, customSearch } = useCards();
    const searchRef = useRef();

    const searchSubmit = (e) => {
        e.preventDefault();
        setCardSearch(searchRef.current.value);
    }

    return <Row>
        <SmallLabel>{(db?.data?.length ?? 0) + " / " + (db?.total_cards ?? 0)}</SmallLabel>
        <Form onSubmit={searchSubmit}> 
            <Search $custom={false} placeholder="Card Name or Custom Query" ref={searchRef}/>
            <SubmitButton type="submit" value="Search"/>
        </Form>
        <CategorySearch placeholder="Search for Category" onChange={(e) => setCategorySearch(e.value)} options={categoryOptions} />
    </Row>
}
