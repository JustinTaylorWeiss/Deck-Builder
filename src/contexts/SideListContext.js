import React, { useContext, createContext, useEffect, useState, useMemo, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';

const SideListContext = createContext();

export const useSideList = () => useContext(SideListContext);


export const SideListProvider = ({ children }) => {

    const [clipboarded, setClipboarded] = useState(false);
    const [activeTab, setActiveTab] = useState("deck");
    const [confirmClear, setConfirmClear] = useState(false);
    const [hoverCard, setHoverCard] = useState("");
    const [backFaces, setBackFaces] = useState([]);

    useEffect(() => {
    },[])

    const value = {
        clipboarded, activeTab, confirmClear, hoverCard, backFaces,
        setClipboarded, setActiveTab, setConfirmClear, setHoverCard, setBackFaces
    };

    return <SideListContext.Provider value={value}>{children}</SideListContext.Provider>
};
