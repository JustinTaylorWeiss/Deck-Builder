import React, { useContext, createContext, useEffect, useState, useMemo, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive'
import { decode } from '../global';
import 'groupby-polyfill/lib/polyfill.js'
const CardContext = createContext();

export const useCards = () => useContext(CardContext);


export const CardProvider = ({ children }) => {

    const [db, setDb] = useState(false);
    const [addRemoveList, setAddRemoveList] = useState({});
    const [loading, setLoading] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);
    const [allLands, setAllLands] = useState([]);
    const [activeLBTag, setActiveLBTag] = useState("");
    const [landBuilder, setLandBuilder] = useState(true); //Set up this toggle to have both work

    // Filters
    const [nameFilter, setNameFilter] = useState("")
    const [oracleTextSearch, setOracleTextSearch] = useState("");
    const [colorFilter, setColorFilter] = useState("");
    const [cmcFilter, setCmcFilter] = useState("");
    const [formatFilter, setFormatFilter] = useState("");
    // TAG DATA
    const [tagList, setTagList] = useState([]);

    // MAYBE LIST DATA
    const [deckList, setDeckList] = useState([]);
    const [landBaseList, setLandBaseList] = useState([]);
    const [landBaseTotalCount, setLandBaseTotalCount] = useState(0);

    const isBig = useMediaQuery({query: '(min-width: 2000px)'})
    const isMid = useMediaQuery({query: '(min-width: 1500px)'})
    const isSmall = useMediaQuery({query: '(min-width: 1000px)'})
    const isMidToSmallest = useMediaQuery({query: '(max-width: 1500px)'})
    
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState("")
    // Fetch Card Databse From API

    //Get all the lands if land builder is active
    /*
    useEffect(()=>{
        if(landBuilder){
            (async () => {
                setLoading(true);
                try {
                    const uri = buildUri("https://api.scryfall.com/cards/search?q=t%3Aland");
                    const res = await fetch(uri);
                    if(res.ok) {
                        const resJson = await res.json();
                        setLoading(false);
                        setAllLands(res.data)
                    }
                    else { 
                        setLoading(false);
                        throw new Error("Responce not 2xx");
                    }
                } catch (e) { console.log(`Card Not Found (Search: All Lands)`); }
            })();
        }
    }, [])
    */

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
            const numOfCard = (addRemoveList?.[card.oracle_id] ?? 0)
            return (numOfCard > 0)
                ? [...acc, {quantity: numOfCard, card: card}]
                : acc
        },[])
    )

    const setDBSearch = async(query) => {
        setLoading(true);
        try {
            const uri = "https://api.scryfall.com/cards/search?order=released&q=" + query;
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
            console.log(`Card Not Found (Search: ${query})`);
        }
    }

    const addCardToDeckList = (cardWrapper) => {
        if(cardWrapper.quantity > 0)
            setDeckList((prev) => [...prev, cardWrapper])
    };

    const addCardToLandBaseList = (cardWrapper) => {
        if(cardWrapper.quantity > 0)
            setLandBaseList((prev) => [...prev, cardWrapper])
    };

    const incOrDecLandBaseCard = (card, negitive) => {
        setLandBaseList(
            (prev) => prev.map((cardWrap) => (
                cardWrap.card.name === card.name
                    ? negitive
                        ? {quantity: Math.max(cardWrap.quantity-1, 0), card: cardWrap.card}
                        : {quantity: cardWrap.quantity+1, card: cardWrap.card}
                    : cardWrap
            ))
        )
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

    const createFilter = (filterType, tagList) => (
        tagList.flatMap((tag) => tag.filters).filter(
            (filter) => filter.type === filterType
        ).reduce((acc, filter) => (
            acc + `${filter.not ? "-" : ""}${filterType}:${filter.value.toLowerCase()}+`
        )
        ,"")
    )

    const expandFilter = useCallback((filterArr) => filterArr.reduce((acc, filter) => acc + filter, ""))

    const buildUri = useCallback((rootUri, nameFilter, oracleTextSearch, colorFilter, cmcFilter, formatFilter, tagList) => {

        const onlyLands = (landBuilder ? "t%3Aland " : "");

        const URI = (
            rootUri + 
            "search?order=released&q=" +
            nameFilter +
            onlyLands + 
            oracleTextSearch +
            colorFilter + 
            cmcFilter +
            formatFilter +
            tagList.reduce((acc, tag) => acc + tag.filters.reduce((innderAcc, filter) => innderAcc + filter,""), "")
        ).slice(0,-1) //Remove trailing +

        //console.log("URI: " + URI);
        return URI;
    }, [])

    useEffect(() => {
        if(nameFilter !== "" || oracleTextSearch !== "" || (tagList.length > 0 && !landBuilder))
            (async () => {
                setLoading(true);
                try {
                    const uri = buildUri("https://api.scryfall.com/cards/", nameFilter, oracleTextSearch, colorFilter, cmcFilter, formatFilter, tagList);
                    //console.log(uri);
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
                    console.log(`Card Not Found (Search: ${nameFilter})`);
                }
            })()
        else
            setDb(false);
    }, [nameFilter, oracleTextSearch, colorFilter, cmcFilter, tagList, setDb, buildUri]);
    

    const getCardFromName = async(name) => {
        try {
            const uri = `https://api.scryfall.com/cards/search?q=${name}`;
            const res = await fetch(uri);
            if(res.ok) {
                const resJson = await res.json();
                setLoading(false);
                return resJson;
            }
            else { 
                throw new Error("Responce not 2xx");
            }
        } catch (e) {
            console.log(`Card Not Found (Search: ${name})`);
        }
        return false;
    }

    const addToLandBaseFromQuery = async(query) => {
        try {
            const uri = `https://api.scryfall.com/cards/search?q=${query} ${colorFilter}`;
            const res = await fetch(uri);
            if(res.ok) {
                const resJson = await res.json();
                const data = await resJson.data;
                const cardsWithQuantities = data.map((card)=>({quantity:1, card:card}))
                setLoading(false);
                setLandBaseList((prev) => [
                    ...prev,
                    ...cardsWithQuantities,
                ])
            }
            else { 
                throw new Error("Responce not 2xx");
            }
        } catch (e) {
            console.log(`Card Not Found (Search: ${query})`);
        }
        return false;
    }

    const addToDeckFromQuery = async(query) => {
        try {
            const uri = `https://api.scryfall.com/cards/search?q=${query} ${colorFilter}`;
            const res = await fetch(uri);
            if(res.ok) {
                const resJson = await res.json();
                const data = await resJson.data;
                const cardsWithQuantities = data.map((card)=>({quantity:1, card:card}))
                setLoading(false);
                setDeckList((prev) => [
                    ...prev,
                    ...cardsWithQuantities,
                ])
            }
            else { 
                throw new Error("Responce not 2xx");
            }
        } catch (e) {
            console.log(`Card Not Found (Search: ${query})`);
        }
        return false;
    }

    const removeFromDeckWithQuery = async(query) => {
        try {
            const uri = `https://api.scryfall.com/cards/search?q=${query} ${colorFilter}`;
            const res = await fetch(uri);
            if(res.ok) {
                const resJson = await res.json();
                const data = await resJson.data;
                setLoading(false);
                setLandBaseList((prev)=>prev.filter(
                    ({quantity, card})=> !data.map((dataCard)=>dataCard.name).includes(card.name)
                ))
            }
            else { 
                throw new Error("Responce not 2xx");
            }
        } catch (e) {
            console.log(`Card Not Found (Search: ${query})`);
        }
        return false;
    }

    const removeCardFromDeck = (card) => {
        setDeckList((prev) => prev.filter((c) => c.card.oracle_id !== card.card.oracle_id))
    }
    
    const removeCardLandBaseList = (card) => {
        setLandBaseList((prev) => prev.filter((c) => c.card.oracle_id !== card.oracle_id))
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
        if (db?.data ?? false)
        setDeckList((prev) => [
            ...prev,
            ...adjustDbToAddRemovedCard(db),
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

    const resetLandBaseList = useCallback(() => {
        localStorage.setItem("landBaseList", "[]");
        setLandBaseList([]);
    }, [setLandBaseList]);

    const resetDeckList = useCallback(() => {
        localStorage.setItem("deckList", "[]");
        setDeckList([]);
    }, [setDeckList]);

    const resetAddRemoveList = useCallback(() => {
        setAddRemoveList({});
    }, [setAddRemoveList]);

    const typeTags = [
        "Legendary", "Snow", "Basic", "Creature", "Land", "Artifact", "Enchantment", "Planeswalker", "Battle", "Instant", "Sorcery", "Creatrue Type", "Custom Subtype"
    ]

    const addToTagList = (tag) => {
        setTagList(prev => [
            ...prev.filter((prevTag) => prevTag.name !== tag.name),
            tag
        ])
    }

    const removeFromTagList = (tagName) => {
        setTagList(prev => prev.filter((tag) => tag.name !== tagName))
    }

    const tagArrayToTypeFilter = () => (
        tagList.filter(
            (tag) => typeTags.includes(tag.name)).map(
                (typeTag) => (typeTag.not ? "-" : "+") + "type%3A" + typeTag.name.toLowerCase()).reduce(
                    (acc, typeString) => acc + typeString
                ,"")
    )

    // Helper Functions
    const changePage = (delta) => {
        const newPage = page + delta;
        if (newPage > Math.ceil((db?.length ?? 0) / 9.0) - 1 || newPage < 0) return;
        setPage(newPage);
    };
    
    const value = {
        page, db, isBig, isMid, isSmall, isMidToSmallest, firstLoad, loading, setLoading, 
        colorFilter,

        selected, setSelected, 
        deckList, setDeckList,
        addRemoveList, setAddRemoveList,
        colorFilter, setColorFilter,
        activeLBTag, setActiveLBTag, 
        landBaseList, setLandBaseList,
        changePage, adjustDbToAddRemovedCard,
        pushSeachListToDeck, resetDeckList,
        resetAddRemoveList, addCardToDeckList,
        loadMoreCards, cardObjArrToListString,
        getNameFromCard, removeCardFromDeck,
        combineDuplicates, getCardFromName,
        addToDeckFromQuery, setLandBuilder,
        setDBSearch, resetLandBaseList,
        removeCardLandBaseList, addToLandBaseFromQuery,
        removeFromDeckWithQuery, addCardToLandBaseList,
        incOrDecLandBaseCard,

        setNameFilter, setOracleTextSearch, setCmcFilter, formatFilter, setFormatFilter,

        tagList, addToTagList, removeFromTagList,
    };

    return <CardContext.Provider value={value}>{children}</CardContext.Provider>
};
