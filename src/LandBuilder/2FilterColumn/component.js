import { useState } from "react";
import styled from "styled-components";
import { useCards } from "../../contexts/CardContext";
import { ColorFilters } from "./1ColorFilters";
import { SearchCluster} from "./2SearchCluster";
import { CardStackCluster } from "./3CardStackCluster";


const Row = styled.div`
    position: sticky;
    top: 0px;
    z-index: 10;
    border-bottom: 2px solid #d8cc65;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
    padding: 20px 0;
    background-color: #282c34;
    ${ props => props.$mobileView 
        ? `
            flex-direction: column;
            padding-bottom: 10px;
            position: static;
        `
        : "flex-direction: row;"
    }
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    
`;

const CardImg = styled.img`
    position: fixed;
    top: 50%;
    z-index: 100;
    margin: 20px 0 0 20px;
    transform: translate(0, -50%);
    ${ props => props.$bigDesktop 
        ? `right: 20%;`
        : `left: 30%;`
    }
    ${ props => props.$mobileView
        ? `
            transform: translate(-50%, -50%);
            left: 50%;
            margin: 0;
            width: 70%;
            max-width: 100vw;   
        `
        : `
            width: 30%;
            max-width: 380px;
        `
    }
    border-radius: calc(4.2% + 5px);
    border: solid #121010 5px;
`;

const Backdrop = styled.div`
    position: fixed;
    backdrop-filter: blur(10px);
    bottom: 0;
    right: 0;
    padding: 0;
    z-index: 10;
    width: 100vw;
    height: 100vh;
`;


export const Filters = () => {

    const tagMenuArr = useState(true);

    const { searchExpanded, mobileView, bigDesktop, hoverCard, setHoverCard, backFaces } = useCards();

    const findImage = (card) => (
        (!card?.image_uris ?? false) 
        ? card.card_faces[((backFaces[card.oracle_id] ?? false) ? 1 : 0)].image_uris.normal
        : card.image_uris.normal
    )

    return <Column>
        {
            searchExpanded && <Row $mobileView={mobileView}>
                <ColorFilters lands={true}/>
                <SearchCluster lands={true} tagMenuArr={tagMenuArr}/>
            </Row>
        }
        { hoverCard && <>          
            <CardImg $mobileView={mobileView} $bigDesktop={bigDesktop} src={findImage(hoverCard.card)}/>
            { mobileView && <Backdrop onClick={(e)=>{
                e.preventDefault()
                setHoverCard("")
            }}/> }
        </>}
        <CardStackCluster lands={true}/>
    </Column>
}