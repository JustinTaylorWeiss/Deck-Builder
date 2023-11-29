import styled from "styled-components";
import { useCards } from "../../contexts/CardContext";
import Select from 'react-select';
import QuestonMark from './icons/questionMark.svg';
import { categoryOptions } from "../categoryOptions";

const Img = styled.img``;
const Link = styled.a`
width: 40px;
height: 40px;
`;

const CategorySearch = styled(Select)`
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
    margin: 0 20px 0 20px;
    width: 290px;
    height: 36px;
    font-size: 1.2rem;
`;

const CustomSearch = styled.input`
    margin: 0 10px 0 20px;
    width: 460px;
    height: 36px;
    font-size: 1.2rem;
`;


export const SearchClusterWrapper = () => {

    const { db, setCategorySearch, setCardSearch, customSearch } = useCards();

    return <Row>
        <SmallLabel>{(db?.data?.length ?? 0) + " / " + (db?.total_cards ?? 0)}</SmallLabel>
        { customSearch 
            ? <SmallRow>
                <CustomSearch placeholder="Custom Scryfall Query" onChange={(e) => setCardSearch(e.target.value)}/>
                <Link href="https://scryfall.com/docs/syntax" target="_blank"><Img height={40} src={QuestonMark}/></Link>
            </SmallRow>
            : <>
                <Search placeholder="Card Name" onChange={(e) => setCardSearch(e.target.value)}/>
                <CategorySearch placeholder="Category" onChange={(e) => setCategorySearch(e.value)} options={categoryOptions} />
            </>
        }
    </Row>
}
