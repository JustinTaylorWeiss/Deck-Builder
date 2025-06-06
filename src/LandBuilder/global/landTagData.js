export const landTags = {
//  Utility Lands
    "Colorless Land":                {totalNumber: 157,query: "-o:\"any color\" id=c t:land"},
    "Any Color Land":                {totalNumber: 92, query: "t:land o:\"any color\" t:land"},
    "One Color Land":                {totalNumber: 299,query: "id=1 t:land"},
    "Two Color Mana Fix Land":       {totalNumber: 270,query: "-otag:utility-land id=2 t:land"},
    "Two Color Utlity Land":         {totalNumber: 121,query: "otag:utility-land id=2 t:land"},
    "Three Color Land":              {totalNumber: 48, query: "id=3 t:land"},
//  "Four Colored Utlity Land":      {totalNumber: 0,  query: "otag:utility-land id=4 t:land"},
    "Five Color Land":               {totalNumber: 3,  query: "(id=5 or o:\"five mana\") t:land"},
//  Popular Lands
    "Basic Land":                    {totalNumber: 6,  query: "t:basic -t:snow"},
    "Snow Basic Land":               {totalNumber: 6,  query: "t:basic t:snow"},
    "Any Color Color Fix":           {totalNumber: 64, query: `(prismatic vista or fabled passage) or t:land -o:/\\{\\d\\}, \\{t\\}/ o:"any color"`},
    "Mono Castle Land":              {totalNumber: 5,  query: "s:ELD t:land castle id=1"},
    "Mono Lord of the Rings Land":   {totalNumber: 5,  query: "s:LTR t:land o:legendary id=1"},
    "Mono MDFC Land":                {totalNumber: 40, query: "is:mdfc id<2 t:land"},
    "Mono Modern Horizon 3 Land":    {totalNumber: 5,  query: "s:MH3 t:land o:unless id=1"},
    "Mono Kamigawa Land":            {totalNumber: 10, query: "(s:NEO or s:CHK) t:land t:legendary id=1"},
    "Dual Bounce Land":              {totalNumber: 10, query: "is:bounceland id>1"},
    "Dual Bond Land":                {totalNumber: 10, query: "is:bondland"}, 
    "Dual Canopy Land":              {totalNumber: 6,  query: "is:canopyland"}, 
    "Dual Check Land":               {totalNumber: 10, query: "is:checkland"}, 
    "Dual Fetch Land":               {totalNumber: 10, query: "is:fetchland"},
    "Dual Hybrid Filter Land":       {totalNumber: 10, query: "is:filterland o:\"or+\""}, 
    "Dual MDFC Land":                {totalNumber: 20, query: "is:mdfc id=2 t:land"},
    "Dual Pain Land":                {totalNumber: 10, query: "is:painland"}, 
    "Dual Scry Land":                {totalNumber: 10, query: "is:scryland"}, 
    "Dual Shock Land":               {totalNumber: 10, query: "is:shockland"}, 
    "Dual Slow Land":                {totalNumber: 10, query: "is:slowland"}, 
    "Dual Surveil Land":             {totalNumber: 10, query: "oracletag:cycle-dual-surveil-land"},
    "Tri Land (Fetchable)":          {totalNumber: 11, query: "t:land (t:forest or t:mountain or t:island or t:swamp or t:plains) id>2"}, 
    "Tri Land (Non-Fetchable)":      {totalNumber: 11, query: "is:triland or tournament grounds"}, 
    //  Extra Lands
    "Mono Adventures Slow Land":     {totalNumber: 5,  query: "s:AFR t:land o:other id=1"},
    "Mono Aetherdrift Land":         {totalNumber: 5,  query: "s:DFT t:land o:unless id=1"},
    "Mono Alliances Land":           {totalNumber: 5,  query: "s:ALL t:land -t:basic id=1"},
    "Mono Bloomburrow Land":         {totalNumber: 5,  query: "s:BLB t:land o:creature id=1"},
    "Mono Dominaria Land":           {totalNumber: 5,  query: "s:DOM t:land memorial id=1"},
    "Mono Dragonstorm Check Land":   {totalNumber: 5,  query: "s:TDM t:land o:unless id=1"},
    "Mono Eldrane Fetchable Land":   {totalNumber: 5,  query: "s:ELD t:land o:untapped id=1"},
    "Mono Fallen Empires Land":      {totalNumber: 10, query: "s:FEM t:land -t:basic id=1"},
    "Mono Hour of Devastation Land": {totalNumber: 5,  query: "s:DOM t:land memorial id=1"},
    "Mono Ixalan Cave Land":         {totalNumber: 5,  query: "s:LCI t:land o:\"discover 4\" id=1"},
    "Mono Legends Land":             {totalNumber: 4,  query: "s:LEG t:land -t:basic id=1"},
    "Mono Lorwyn Land":              {totalNumber: 5,  query: "s:LRW t:land o:hideaway id=1"},
    "Mono Mercadian Masques Land":   {totalNumber: 10, query: "s:MMQ t:land o:counter id=1"},
    "Mono Mirroden Artifact Land":   {totalNumber: 5,  query: "s:MRD t:land t:artifact id=1"},
    "Mono Odyssey Land":             {totalNumber: 10, query: "s:ODY t:land o:sacrifice id=1"},
    "Mono Onslaught Cycling Land":   {totalNumber: 5,  query: "s:ONS t:land o:cycling id=1"},
    "Mono Phyrexia Sphere Land":     {totalNumber: 5,  query: "s:ONE t:land t:sphere id=1"},
    "Mono Shadowmoor Fetchable Land":{totalNumber: 5,  query: "s:SHM t:land o:tapped id=1"},
    "Mono Urza's Saga Land":         {totalNumber: 9,  query: "s:USG t:land -t:basic id=1"},
    "Mono Visions Bounce Land":      {totalNumber: 7,  query: "is:bounceland id<2"},
    "Mono Worldwake Land":           {totalNumber: 5,  query: "s:WWK t:land o:tapped id=1"},
    "Mono Zendikar Land":            {totalNumber: 5,  query: "(s:BFZ or s:ZEN) t:land o:enters id=1"},
    "Dual Artifact Land":            {totalNumber: 10, query: "t:land t:artifact id=2"}, 
    "Dual Bicycle Land":             {totalNumber: 5,  query: "s:AKH id=2 o:cycling"}, 
    "Dual Campus Land":              {totalNumber: 5,  query: "otag:cycle-stx-campus"}, 
    "Dual Creature Land":            {totalNumber: 20, query: "otag:creatureland id=2 -o:\"add {c}\""}, 
    "Dual Deplete Land":             {totalNumber: 5,  query: "s:ICE t:land id=2 o:counter"}, 
    "Dual Desert Ping Land":         {totalNumber: 10, query: "otag:cycle-otj-pingland"},
    "Dual Fast Land":                {totalNumber: 10, query: "is:fastland"}, 
    "Dual Fetchable Snow Land":      {totalNumber: 10, query: "s:KHM t:snow id=2 t:land o:tapped"}, 
    "Dual Fetchable Tapped Land":    {totalNumber: 10, query: "s:DMU id=2 t:land o:tapped"}, 
    "Dual Gain Land":                {totalNumber: 10, query: "otag:cycle-gainland"}, 
    "Dual Guild Gate Land":          {totalNumber: 10, query: "otag:cycle-guildgate"}, 
    "Dual Horizon Land":             {totalNumber: 6,  query: "otag:cycle-horizon-land"}, 
    "Dual Kamigawa Land":            {totalNumber: 10, query: "s:CHK id=2 t:land"}, 
    "Dual Kindred Land":             {totalNumber: 5,  query: "oracletag:cycle-lrw-tribal-dual-land"}, 
    "Dual Land":                     {totalNumber: 10, query: "is:dual"}, 
    "Dual Land (Extras)":            {totalNumber: 5,  query: "(Fortified Beachhead or Mount Doom or Grove of the Burnwillows or Nimbus Maze or River of Tears or Krosan Verge) t:land"},
    "Dual Odyssey Filter Land":      {totalNumber: 10, query: "is:filterland o:/add {.}{.}\\./"}, 
    "Dual Reveal Land":              {totalNumber: 10, query: "otag:cycle-reveal-land"}, 
    "Dual Refuge Land":              {totalNumber: 5,  query: "otag:cycle-zen-refugeland"}, 
    "Dual Sac Draw Land":            {totalNumber: 5,  query: "s:SNC t:land o:draw"}, 
    "Dual Slow Fetch Land":          {totalNumber: 5,  query: "s:MIR t:land o:search"}, 
    "Dual Storage Land":             {totalNumber: 5,  query: "otag:cycle-tsp-storage-land"},
    "Dual Tainted Land":             {totalNumber: 4,  query: "otag:cycle-tainted-land"},
    "Dual Tango Land":               {totalNumber: 5,  query: "is:tangoland"},
    "Dual Tapped Land":              {totalNumber: 10, query: "s:M19 id=2 o:tapped t:land"}, 
    "Dual Tapped Invasion Land":     {totalNumber: 5,  query: "s:INV id=2 t:land"}, 
    "Dual Tapped Snow Land":         {totalNumber: 10, query: "s:CSP id=2 t:land"}, 
    "Dual Tempest Land":             {totalNumber: 10, query: "s:TMP id=2 t:land"}, 
    "Dual Verge Land":               {totalNumber: 10, query: "otag:cycle-verge"},
    "Tri Alara Fetch Land":          {totalNumber: 5,  query: "otag:cycle-ala-panorama"},
    "Tri New Capenna Fetch Land":    {totalNumber: 5,  query: "otag:cycle-snc-fetchland"},
    "Tri Homelands Land":            {totalNumber: 5,  query: "s:HML id=3"},
    "Tri Invasion Land":             {totalNumber: 5,  query: "otag:cycle-inv-sacland"},
    "Tri Lair Land":                 {totalNumber: 5,  query: "t:lair id=3"},
    "Tri Land (Extras)":             {totalNumber: 3,  query: "crypt of the eternals or tournament grounds or murmuring bosk"}, 
    "Cave Land":                     {totalNumber: 20, query: "t:cave t:land"},
    "Desert Land":                   {totalNumber: 37, query: "t:desert t:land"},
    "Gate Land":                     {totalNumber: 23, query: "t:gate t:land"},
    "Locus Land":                    {totalNumber: 3,  query: "t:locus t:land"},
    "Snow Land":                     {totalNumber: 27, query: "t:land t:snow"},
    "Sphere Land":                   {totalNumber: 9,  query: "t:sphere t:land"},
    "Urza Land":                     {totalNumber: 7,  query: "t:urza t:land"},
}