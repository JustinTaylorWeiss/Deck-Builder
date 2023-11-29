import styled from "styled-components";
import { CardProvider } from "./contexts/CardContext";
import { SideList } from "./SideList";

import { SearchCluster } from "./CardSearch/SearchCluster";
import { ColorFilters } from "./CardSearch/ColorFilters";
import { CmcFilter } from "./CardSearch/CmcFilter";
import { CardStackCluster } from "./CardSearch/CardStackCluster";


const MiniApp = styled.div`
    display: grid;
    width: 98vw;
    grid-gap: 5px;
    grid-template-columns: 79vw 19vw;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`

const App = () => <CardProvider>
    <MiniApp>
        <Column>
            <ColorFilters/>
            <CmcFilter/>
            <SearchCluster/>
            <CardStackCluster/>
        </Column>
        <SideList/>
    </MiniApp>
</CardProvider>;

export default App;

/*
const AppWrap = styled.div`
    width: 100vw;
    display: grid;
    grid-gap: 5%;
    grid-template-columns: 1fr 4fr 1fr;
    @media (max-width: 2000px) {
        grid-gap: 0;
    }
`
*/

/*
<AppWrap>
    <DeckList/>
    <CardSearch/>
    <SearchList/>
</AppWrap>
*/