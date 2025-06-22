import styled from "styled-components";
import "./ToggleButton.css";


export const ToggleButton = ({setToggle}) => {

    return <label className="switch">
        <input type="checkbox" onClick={()=>{setToggle((prev)=>!prev)}}/>
        <span className="slider round"></span>
    </label>
}