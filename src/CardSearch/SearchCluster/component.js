import styled from "styled-components";
import { useCards } from "../../contexts/CardContext";
import Select from 'react-select';
import QuestonMark from './icons/questionMark.svg';
import { categoryOptions } from "../categoryOptions";
import { useRef } from "react";

const Img = styled.img``;
const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Link = styled.a`
    width: 40px;
    height: 40px;
`;

const CategorySearch = styled(Select)`
    width: 200px;
    font-size: 1.2rem;
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
    width: calc(
        ${props => props.$custom ? "450px" : "290px"} 
        - calc(81px + 0.5rem)
    );
    height: 36px;
    padding-left: 0.5rem;
    padding-right: calc(81px + 0.5rem);
    font-size: 1.2rem;
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
        { customSearch 
            ? <SmallRow>
                <Form onSubmit={searchSubmit}> 
                    <Search $custom={true} ref={searchRef} placeholder="Custom Scryfall Query"/>
                    <SubmitButton type="submit" value="Search"/>
                </Form>
                <Link href="https://scryfall.com/docs/syntax" target="_blank"><Img height={40} src={QuestonMark}/></Link>
            </SmallRow>
            : <>
                <Form onSubmit={searchSubmit}> 
                    <Search $custom={false} placeholder="Card Name" ref={searchRef}/>
                    <SubmitButton type="submit" value="Search"/>
                </Form>
                <CategorySearch placeholder="Category" onChange={(e) => setCategorySearch(e.value)} options={categoryOptions} />
            </>
        }
    </Row>
}
