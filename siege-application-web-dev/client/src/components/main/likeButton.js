import React from "react";
import "./posts.css";
import { Image } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { SimpleGrid } from '@chakra-ui/react'
import { useState } from 'react';
import {
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Box,
    ChakraProvider
} from "@chakra-ui/react";

//this is a like button that increments and decrements the number in the center
//based on user input
//the posts js file was really long so I exported the function to the posts js
//and worked on the like button in here then imported the function into the flex grid
//I used to make the post

function ButtonIncrement(props) {
  
    return (
      <button style={{ marginLeft: '.5rem'}} onClick={props.onClickFunc}>
      <Image class="lefticons" src="https://www.citypng.com/public/uploads/preview/white-double-arrow-to-up-icon-transparent-png-11639648532e1ou3sqe1w.png" />
      </button>
    )
 }
 
 function ButtonDecrement(props) {
   
   return (
     <button style={{ marginLeft: '.5rem'}} onClick={props.onClickFunc}>
     <Image class="lefticons" src="https://www.citypng.com/public/uploads/preview/white-double-arrow-to-down-icon-hd-png-11639648464vwffjnm1lo.png" />
     </button>
   )
 }
 
 function Display(props) {
   return (
     <label style={{ marginLeft: '-0.8rem'}} >{props.message}</label>
   )
 }

function LikeButton() {
    const gridStyles = {
        columns: 1,
        spacing: 0,
        padding: "0.5em"
    }

    const leftPostBoxStyles = {
        backgroundColor: '#292727',
        width: '100%'
    }  

    const [counter, setCounter] = useState(1);
    const incrementCounter = () => setCounter(counter + 1);
    let decrementCounter = () => setCounter(counter - 1);

    if(counter<=1) {
        decrementCounter = () => setCounter(1);
    }


    return(
        <div> 
         <SimpleGrid sx={gridStyles}>
        <ButtonIncrement onClickFunc={incrementCounter}/>
        <Display message={counter}/> 
        <ButtonDecrement onClickFunc={decrementCounter}/>
        </SimpleGrid>
        </div>
    );
}

export default LikeButton;
