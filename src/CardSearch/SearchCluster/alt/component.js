import styled from "styled-components";
import { useCards } from "../../../contexts/CardContext";
import Select from 'react-select';
import { catagoryOptions } from "../../catagoryOptions";

const CatagorySearch = styled(Select)`
    width: 200px;
    height: 36px;
    font-size: 1.2rem;
    color: black;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 10px 0 10px 0;
`;

const SmallLabel = styled.label`
    font-size: 1.5rem;
    @media (max-width: 1500px) {
        font-size: 1rem;
    }
`;

const Search = styled.input`
    margin: 0 20px 0 20px;
    width: 300px;
    height: 36px;
    font-size: 1.2rem;
`;

const CustomSearch = styled.input`
    margin: 0 20px 0 20px;
    width: 500px;
    height: 36px;
    font-size: 1.2rem;
`;


export const AltSearchClusterWrapper = () => {

    const { db, setCatagorySearch, setCardSearch, customSearch } = useCards();

    return <Row>
        <SmallLabel>{(db?.data?.length ?? 0) + " / " + (db?.total_cards ?? 0)}</SmallLabel>
        { customSearch 
            ? <CustomSearch placeholder="Custom Scryfall Query" onChange={(e) => setCardSearch(e.target.value)}/>
            : <>
                <Search placeholder="Card Name" onChange={(e) => setCardSearch(e.target.value)}/>
                <CatagorySearch placeholder="Catagory" onChange={(e) => setCatagorySearch(e.value)} options={catagoryOptions} />
            </>
        }
    </Row>
}
