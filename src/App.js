import styled from "styled-components";
import { CardProvider } from "./contexts/CardContext";
import { SideList } from "./SideList";
import { SideListProvider } from "./contexts/SideListContext";

import { SearchCluster } from "./CardSearch/SearchCluster";
import { ColorFilters } from "./CardSearch/ColorFilters";
import { CmcFilter } from "./CardSearch/CmcFilter";
import { CardStackCluster } from "./CardSearch/CardStackCluster";
import { useState } from "react";
import { TagList } from "./TagList/component";


const MiniApp = styled.div`
    display: grid;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
    width: 100vw;
    grid-gap: 5px;
    grid-template-columns: ${props => props.$menuOpen ? "20vw 60vw 20vw" : "80vw 20vw"};
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`

const Spacer = styled.div``;

const App = () => {

    const tagMenuArr = useState(false);
    const [tagMenu, setTagMenu] = tagMenuArr;

return <CardProvider>
    <MiniApp $menuOpen={tagMenu}>
        {tagMenu && <Spacer/>}
        <Column>
            <ColorFilters/>
            <CmcFilter/>
            <SearchCluster tagMenuArr={tagMenuArr}/>
            <CardStackCluster/>
        </Column>
        {tagMenu && <TagList/>}
        <SideListProvider><SideList/></SideListProvider>
    </MiniApp>
</CardProvider>
};

export default App;