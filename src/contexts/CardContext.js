import React, { useContext, createContext, useEffect, useState, useMemo, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive'
import 'groupby-polyfill/lib/polyfill.js'
const CardContext = createContext();

export const useCards = () => useContext(CardContext);


export const CardProvider = ({ children }) => {

    const [db, setDb] = useState(false);
    const [addRemoveList, setAddRemoveList] = useState({});

    const [colorFilter, setColorFilter] = useState(
        {
            filterType: "colorIdentity",
            white: true,
            blue: true,
            black: true,
            red: true,
            green: true,
            colorless: false, 
        }
    );
    const [loading, setLoading] = useState(false);
    const [searchToMaybeBoard, setSearchToMaybeBoard] = useState(true);
    const [cmcFilterType, setCmcFilterType] = useState('');
    const [cmcFilter, setCmcFilter] = useState(0);
    const [firstLoad, setFirstLoad] = useState(true);
    const [customSearch, setCustomSearch] = useState('');
    const [cardSearch, setCardSearch] = useState('');
    const [currentUri, setCurrentUri] = useState('');
    const [showQuery, setShowQuery] = useState(false);
    const [categorySearch, setCategorySearch] = useState('');
    const [deckList, setDeckList] = useState([]);
    const [searchFormat, setSearchFormat] = useState('');

    const isBig = useMediaQuery({query: '(min-width: 2000px)'})
    const isMid = useMediaQuery({query: '(min-width: 1500px)'})
    const isSmall = useMediaQuery({query: '(min-width: 1000px)'})
    const isMidToSmallest = useMediaQuery({query: '(max-width: 1500px)'})
    
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState("")
    // Fetch Card Databse From API

    useEffect(() => {
        const localDeckList = JSON.parse(localStorage.getItem("deckList"));
        if(localDeckList) 
            setDeckList(localDeckList);
    },[setDeckList])

    useEffect(() => {
        if(deckList.length > 0)
            localStorage.setItem("deckList", JSON.stringify(deckList));
    },[deckList])

    const adjustDbToAddRemovedCard = (db) => (
        db.data.reduce((acc, card) => {
            const numOfCard = (addRemoveList?.[card.oracle_id] ?? (searchToMaybeBoard ? 1 : 0))
            return (numOfCard > 0)
                ? [...acc, {quantity: numOfCard, card: card}]
                : acc
        },[])
    )

    const colorFilterToUriText = useCallback((colorFilter) => (
        (
            colorFilter.white ||
            colorFilter.blue  ||
            colorFilter.black ||
            colorFilter.red   ||
            colorFilter.green ||
            colorFilter.colorless)
                ? ("+" + 
                    (
                        colorFilter.filterType === "colorIdentity"
                            ? "id<%3D"
                            : "c%3D"
                    ) + (
                        colorFilter.colorless
                        ? "C"
                        : "" + 
                        (colorFilter.white ? "W" : "") +
                        (colorFilter.blue  ? "U" : "") +
                        (colorFilter.black ? "B" : "") + 
                        (colorFilter.red   ? "R" : "") +
                        (colorFilter.green ? "G" : "")
                    )
                )
                : ""
    ),[]);

    const addCardToDeckList = (cardWrapper) => {
        if(cardWrapper.quantity > 0)
            setDeckList((prev) => [...prev, cardWrapper])
    };

    const cardObjArrToListString = (cardObjArr) => (
        cardObjArr.map((cardObj) => (
            "" + cardObj.quantity + "x " + 
            ((cardObj?.card?.card_faces ?? false)
                ? cardObj.card.card_faces[0].name + " // " + cardObj.card.card_faces[1].name
                : cardObj.card.name
            )
        ))
    );

    const getNameFromCard = (card) => (
        (card?.card_faces ?? false)
            ? card.card_faces[0].name + " // " + card.card_faces[1].name
            : card.name
    );

    const buildUri = useCallback((rootUri, cardSearch, cmcFilter, cmcFilterType, catagorySearch, colorFilter, searchFormat) => (
        rootUri + 
        "search?order=cmc&q=" + 
                encodeURIComponent(cardSearch) + 
                catagorySearch +
                    (cmcFilterType !== ""
                        ? ("+mv" + cmcFilterType + cmcFilter)
                        : "") + 
                    ((searchFormat && searchFormat !== "all") ? `+f%3A${searchFormat}` : "") + 
                ((colorFilterToUriText(colorFilter) !== "+id<%3DWUBRG") ? colorFilterToUriText(colorFilter) : "")
    ),[colorFilterToUriText])

    const decode = (uri) => (
        uri.
        replaceAll("%2A", "*").
        replaceAll("%3A", ":").
        replaceAll("%2B", "+").
        replaceAll("%3B", ";").
        replaceAll("%3D", "=").
        replaceAll("%3F", "?").
        replaceAll("%40", "@").
        replaceAll("%5B", "[").
        replaceAll("%5D", "]").
        replaceAll("%5C", "\\").
        replaceAll("%2F", "/").
        replaceAll("%3C", "<").
        replaceAll("%3E", ">").
        replaceAll("%2D", ">").
        replaceAll("%7E", "~").
        replaceAll("%7B", "{").
        replaceAll("%7D", "}").
        replaceAll("%5F", "_").
        replaceAll("%20", " ").
        replaceAll("%21", "!").
        replaceAll("%22", "\"").
        replaceAll("%23", "#").
        replaceAll("%24", "$").
        replaceAll("%25", "%").
        replaceAll("%26", "&").
        replaceAll("%27", "'").
        replaceAll("%28", "(").
        replaceAll("%29", ")").
        replaceAll("%7C", "|")
    )

    useEffect(() => {
        if(cardSearch !== "" || categorySearch !== "")
            (async () => {
                setLoading(true);
                try {
                    const uri = buildUri("https://api.scryfall.com/cards/", cardSearch, cmcFilter, cmcFilterType, categorySearch, colorFilter, searchFormat,);
                    console.log(uri);
                    setCurrentUri(decode(uri));
                    setFirstLoad(false);
                    const res = await fetch(uri);
                    if(res.ok) {
                        const resJson = await res.json();
                        setLoading(false);
                        setDb(resJson);
                    }
                    else { 
                        setDb(false);
                        setLoading(false);
                        throw new Error("Responce not 2xx");
                    }
                } catch (e) {
                    console.log(`Card Not Found (Search: ${cardSearch})`);
                }
            })()
        else
            setDb(false);
    }, [cardSearch, setDb, colorFilterToUriText, colorFilter, cmcFilter, cmcFilterType, searchFormat, categorySearch, buildUri]);
    
    const colorlessTrueFilter = (filterType) => ({
        filterType: filterType,
        white: false,
        blue: false,
        black: false,
        red: false,
        green: false,
        colorless: true, 
    });

    const setFilterType = (filterType) => {
        if(["colorIdentity", "color"].includes(filterType))
            setColorFilter((prevColorFilter) => ({
                ...prevColorFilter,
                filterType: filterType
            }))
    };

    const setColorOnColorFilter = (color, value) => (
        setColorFilter((prevColorFilter) => 
            color === "colorless" && value
                ? colorlessTrueFilter(prevColorFilter.filterType)
                : ({
                    ...prevColorFilter,
                    [color]: value,
                    colorless: false,
                })
        )
    );

    const removeCardFromDeck = (card) => {
        setDeckList((prev) => prev.filter((c) => c.card.oracle_id !== card.card.oracle_id))
    }

    const combineDuplicates = (cardList) => {
        const uniqueCardGroups = Object.values(Object.groupBy(cardList, ({card}) => card.oracle_id));
        return uniqueCardGroups.flatMap((cardGroup) => 
            cardGroup.length > 1
                ? [{quantity: cardGroup.reduce((acc, cardWrapper) => acc + cardWrapper.quantity, 0), card: cardGroup[0].card}]
                : cardGroup
        );
    }

    const pushSeachListToDeck = () => {
        if (fdb?.data ?? false)
        setDeckList((prev) => [
            ...prev,
            ...adjustDbToAddRemovedCard(fdb),
        ])
    }

    const loadMoreCards = async() => {
        setLoading(true);
        const res = await fetch(db.next_page);
        const json = await res.json();
        setDb({
            ...json,
            data: [...db.data, ...json.data],
        });
        setLoading(false);
    }

    const resetDeckList = useCallback(() => {
        localStorage.setItem("deckList", "[]");
        setDeckList([]);
    }, [setDeckList]);

    const resetAddRemoveList = useCallback(() => {
        setAddRemoveList({});
    }, [setAddRemoveList]);

    // Set FDB
    const fdb = useMemo(() => (db), [db]);

    // Helper Functions
    const changePage = (delta) => {
        const newPage = page + delta;
        if (newPage > Math.ceil((fdb?.length ?? 0) / 9.0) - 1 || newPage < 0) return;
        setPage(newPage);
    };
    
    const value = {
        page,
        fdb,
        db,
        colorFilter,
        isBig, isMid, isSmall,
        isMidToSmallest,
        currentUri,
        firstLoad,
        selected, setSelected, 
        loading, setLoading, 
        deckList, setDeckList,
        cardSearch, setCardSearch,
        cmcFilterType, setCmcFilterType,
        cmcFilter, setCmcFilter,
        customSearch, setCustomSearch,
        searchFormat, setSearchFormat,
        categorySearch, setCategorySearch,
        addRemoveList, setAddRemoveList,
        searchToMaybeBoard, setSearchToMaybeBoard,
        showQuery, setShowQuery,
        changePage, setColorOnColorFilter, 
        setFilterType, adjustDbToAddRemovedCard,
        pushSeachListToDeck, resetDeckList,
        resetAddRemoveList, addCardToDeckList,
        loadMoreCards, cardObjArrToListString,
        getNameFromCard, removeCardFromDeck,
        combineDuplicates,
    };

    return <CardContext.Provider value={value}>{children}</CardContext.Provider>
};
