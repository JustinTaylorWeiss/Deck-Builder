import styled from "styled-components";
import { Fragment, useEffect, useState } from "react";
import donateIMG from "../assets/donate.png";
import donateScribble from "../assets/donateScribble.gif";

const DonateButton = styled.button`
    margin-bottom: 20px;
    background-color: transparent;
    border: 0;
    padding: 0;
    width: 100%;
    height: 40px;
    border-radius: 0;
    border-radius: 5px;
    background-color: #13C3FF;
    &:hover {
        cursor: pointer;
    };
`;

const DonateIMG = styled.img`
    margin: 0;
    height: 40px;
    max-width: 100%;
    padding: 0;
    border-radius: 5px;
`;

export const DonateWrapper = () => {

    const [donateHover, setDonateHover] = useState(false);

    return <DonateButton onMouseOver={()=> {setDonateHover(true)}} onMouseOut={()=> {setDonateHover(false)}} onClick={() => window.open("https://ko-fi.com/justintaylorweiss", "_blank") }>
        <DonateIMG src={donateHover ? donateScribble : donateIMG}/>
    </DonateButton>
}