import { Fragment, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ArrowIcon } from "./assets/Arrow";

const ArrowIconWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    transform: rotate(-90deg);
    ${props => props.$active && "transform: rotate(0deg);"}
`;

const H3 = styled.div`
    text-align: center;
    padding: 20px 0;
    font-size: 1.25rem;
`;

const HeaderWrap = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    margin-left: 20px;
    width: 100%;
    &:hover{
        color: #9e9e9e;
        cursor: pointer;
    }
`;

const SubListWrap = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`;

export const SubList = ({name, buttons = []}) => {

    const [active, setActive] = useState(false);

    return <SubListWrap>
        <HeaderWrap onClick={() => setActive(prev => !prev)}>
            <ArrowIconWrap $active={active}><ArrowIcon/></ArrowIconWrap>
            <H3>{name}</H3>
        </HeaderWrap>
        {
            active && buttons
        }
    </SubListWrap>
}