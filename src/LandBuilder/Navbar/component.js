import styled from "styled-components";
import duck from "./Asssets/duck.png";
import tag from "./Asssets/tag.png";
import deck from "./Asssets/deck.png";

const NavbarWrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items:center;
    height: 60px;
    background-color: #121010;
    border-bottom: 2px solid #d8cc65;
    padding: 5px 0;
`;

const Duck = styled.img`
    height: 50px;
`;

const CenterWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

const Menu = styled.img`
    filter:invert();
    height: 50px;
    margin: 0 20px;
`;

const Spacer = styled.div`
`;

const TitleText = styled.h1`
    padding: 0 10px;
    font-size: 2rem;
    font-weight: 600;
`;

export const Navbar = () => {
    
    const isMobile = false;
    
    return <NavbarWrap>
        { isMobile 
            ? <Menu src={tag} alt="Tags"/> 
            : <Spacer/>
        }
            <CenterWrap>
                <Duck src={duck} alt="Duck"/>
                <TitleText>FloatMana.app</TitleText>
            </CenterWrap>
        { isMobile 
            ? <Menu src={deck} alt="Card List"/> 
            : <Spacer/>
        }
    </NavbarWrap>
}