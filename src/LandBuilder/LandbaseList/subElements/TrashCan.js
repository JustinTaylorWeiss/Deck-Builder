import styled from "styled-components";
import { Fragment, useEffect, useState } from "react";
import trash from "../assets/trash.svg";

const TrashImg = styled.img`
    height: 15px;
    padding: 3px;
    margin: 2px 8px;
    border-radius: 3px;
    &:hover {
        background-color: #ff000066;
    }
    &:active {
        background-color: #ff0000;
    }
    @media (min-width: 2000px) {
        font-size: 45rem;
    }
    @media (max-width: 1000px) {
        font-size: 30rem;
    }
`;

export const Trash = ({ trashCanOnClick }) => (
    <TrashImg src={trash} onClick={trashCanOnClick}/>
);