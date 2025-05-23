import styled from "styled-components";
import { CardProvider } from "./contexts/CardContext";
import { useEffect, useState } from "react";
import { CardQuereyBuilder } from "./CardQuereyBuilder";
import { LandBuilder } from "./LandBuilder";

const App = () => {

    const landBuilder = true;

return <CardProvider>
    {
        landBuilder 
            ? <LandBuilder/>
            : <CardQuereyBuilder/>
    }

</CardProvider>
};

export default App;