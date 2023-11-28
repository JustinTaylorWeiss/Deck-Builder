import styled from "styled-components";
import { useCards } from "../../contexts/CardContext";
import Select from 'react-select';
import { catagoryOptions } from "../catagoryOptions";

const CatagorySearch = styled(Select)`
    width: 15vw;
    height: 36px;
    font-size: 1.2rem;
    color: black;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 30px 0 20px 0;
`;

const SmallLabel = styled.label`
    font-size: 1rem;
`;

const Search = styled.input`
    margin: 0 60px 0 20px;
    width: 25vw;
    height: 36px;
    font-size: 1.2rem;
`;


export const SearchClusterWrapper = () => {

    const { db, setCatagorySearch, setCardSearch } = useCards();

    return <Row>
        <SmallLabel>{"Results: " + (db?.data?.length ?? 0) + " / " + (db?.total_cards ?? 0)}</SmallLabel>
        <Search placeholder="Card Name" onChange={(e) => setCardSearch(e.target.value)}/>
        <CatagorySearch placeholder="Select Catagory..." onChange={(e) => setCatagorySearch(e.value)} options={catagoryOptions} />
    </Row>
}
