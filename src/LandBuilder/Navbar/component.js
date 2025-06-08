import styled from "styled-components";
import duck from "./Asssets/duck.png";
import tag from "./Asssets/tag.png";
import deck from "./Asssets/deck.png";
import { useMediaQuery } from "react-responsive";
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useCards } from "../../contexts/CardContext";

const NavbarWrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items:center;
    width: 100vw;
    height: 60px;
    background-color: #121010;
    border-bottom: 2px solid #d8cc65;
    ${ props => props.$mobileView
        ? "padding: 0;"
        : "padding: 5px 0;"
    }
`;

const Duck = styled.img`
    ${ props => props.$mobileView
        ? "height: 40px;"
        : "height: 50px;"
    }
`;

const CenterWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

const Menu = styled(MenuIcon)`
    margin: 0;
    margin-left: 20px;
    padding: 0 5px;
    border-radius: 5px;
    body & {
        height: 40px;
        width: 40px;
    }
    &:hover {
        background-color: rgba(255, 255, 255, 0.3);
        cursor: pointer;
    }
`;

const Expand = styled(ArrowBackIosNewIcon)`
    margin: 0 20px;
    transition: 200ms;
    transform: rotate(0deg);
    padding: 5px;
    border-radius: 5px;
    ${ props => props.$active
        ? "transform: rotate(270deg);"
        : "transform: rotate(0deg);"
    }
    &:hover {
        background-color: rgba(255, 255, 255, 0.3);
        cursor: pointer;
    }
`;

const Spacer = styled.div`
    width: 70px;
`;

const TitleText = styled.h1`
    padding: 0 10px;
    font-weight: 600;
    ${ props => props.$mobileView
        ? `font-size: 1.5rem;`
        : "font-size: 2rem;"
    }
`;

export const Navbar = () => {
    
    const mobileView = useMediaQuery({query: '(max-width: 900px)'});

    const { searchExpanded, setSearchExpanded, mobileMenu, setMobileMenu } = useCards();
    
    return <NavbarWrap $mobileView={mobileView}>
        { mobileView 
            ? <Menu sx={{ color:(mobileMenu ? "#d8cc65" : "white") }} onClick={()=>{setMobileMenu((prev)=>!prev)}} src={tag} alt="Tags"/> 
            : <Spacer/>
        }
            <CenterWrap>
                <Duck $mobileView={mobileView} src={duck} alt="Duck"/>
                <TitleText $mobileView={mobileView}>FloatMana.app</TitleText>
            </CenterWrap>
        { (mobileView && false) 
            ? <Expand sx={{ color:(searchExpanded ? "#d8cc65" : "white") }} $active={searchExpanded} onClick={()=>{setSearchExpanded((prev)=>!prev)}} src={deck} alt="Card List"/> 
            : <Spacer/>
        }
    </NavbarWrap>
}