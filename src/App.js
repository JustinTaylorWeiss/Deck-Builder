import styled from "styled-components";
import { CardProvider } from "./contexts/CardContext";
import { DeckList } from "./DeckList";
import { CardSearch } from "./CardSearch";
import { SearchList } from "./SearchList";

const AppWrap = styled.div`
    width: 100vw;
    display: grid;
    grid-gap: 7%;
    grid-template-columns: 1fr 4fr 1fr;
`

function App() {
  return (
    <CardProvider>
        <AppWrap>
            <DeckList/>
            <CardSearch/>
            <SearchList/>
        </AppWrap>
    </CardProvider>
  );
}

export default App;
