import {React, useState} from "react";
import {Divider} from "@chakra-ui/react";
import styles from "./styles.scss"; 
import {Rnd} from "react-rnd";
import {BiExpandAlt} from "react-icons/bi";

// Underlying syle for adjustable box component.
const style = {
    display: "flex",
    flexDirection: "row",
    alignItems: "space-between",
    justifyContent: "space-between",
    border: "solid 1px #F4EBE9",
    borderColor: "rgb(138, 138, 138)",
    borderWidth: "0.35px",
    background: "black",
    width:"360px",
    height: "410px",
    borderRadius: "6.5px",
    paddingTop: "5px",
    paddingLeft: "17.5px",
    perspective: "1px",
  };
// Underlying style for resize button. 
const style_sec = {
    position: "absolute", 
    userSelect: "none", 
    width: "20px", 
    height: "20px", 
    right: "6px", 
    top: "8px",
    cursor: "ne-resize",
}


const AdjBox = (props) => {
    const [boxState, setBoxState] = useState({
        width: 350,
        height: 400,
        x: 10,
        y: 10,
        divLength: function(){
            return (boxState.width - 37.5)
        }
    });
    //Handle-area relegated to header div?

    return (
        <Rnd
            minHeight={'276px'}
            minWidth={'188px'}
            resizeHandleComponent= {{topRight: <BiExpandAlt className='icon'/>}}
            resizeHandleStyles = {{topRight: style_sec}}
            bounds = "window"
            style={style}
            size={{ width:  boxState.width, height: boxState.height }}
            position={{ x: boxState.x, y: boxState.y }}
            onDragStop={(e, d) => {
            setBoxState({ ...boxState, x: d.x, y: d.y });
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
            setBoxState({...boxState,
                width: ref.style.width,
                height: ref.style.height,
                ...position,
                divLength: function(){
                    return (parseInt(ref.style.width, 10)) - 37.5}
                
            })}}
        >
            <div className="adjbox-outer">
                <div className="adjbox-inner">
                    <span className="handle-axis">
                            <strong className="header">{props.title}</strong>
                    </span>
                </div>
                <div>
                    <Divider id='divider' width = {boxState.divLength()} marginTop={'2'}/>
                </div>
            </div> 
        </Rnd>
        );
}



export default AdjBox; 

 