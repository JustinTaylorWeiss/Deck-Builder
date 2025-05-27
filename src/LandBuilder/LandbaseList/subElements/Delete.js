import styled from "styled-components";
import { Fragment, useEffect, useState } from "react";
import deleteIcon from "../assets/delete.svg";

const DeleteImg = styled.img`
    height: 15px;
    padding: 3px;
    margin: 2px 8px;
    border-radius: 4px;
    transition: 0ms;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    filter: invert(1);
    &:hover {
        background-color: #00ffff66;
        cursor: pointer;
    }
    &:active {
        background-color: #ff0000;
        filter: invert(0);
    }
    @media (min-width: 2000px) {
        font-size: 45rem;
    }
    @media (max-width: 1000px) {
        font-size: 30rem;
    }
`;

export const DeleteIcon = ({ deleteOnClick }) => (
    <DeleteImg src={deleteIcon} onClick={deleteOnClick}/>
);