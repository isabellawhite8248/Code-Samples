import "./posts.css";
import { Image } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'
import { SimpleGrid } from '@chakra-ui/react'
import LikeButton from './likeButton'
import { Center, Square, Circle } from '@chakra-ui/react'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
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
import { Flex, Spacer } from '@chakra-ui/react'
import { Scrollbars } from 'react-custom-scrollbars';

//am I allowed to use the Scrollbars package? it is react but not necessarily from chakra
// marked the posts tag as done because I embedded the post component within the scrollable box, but they 
//are two seperate things on git...
// potential next task could be consolidating style elements to condense them/moving them to css?
//I can work on it I'm just not sure what would be more useful components or a css file...

// Questions:
// - what dimensions does it need to Be? probally needs to be resized too big right now for mobile screens 
// - is the custom scroll bar going to be an issue were we only strictly supposed to pull from the chakra lib?

function Post() { 
  
  //returns a js react component with a scrollable list of posts modeled after wireframe using dummy icons

  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: 'rgba(35, 49, 86, 0.8)'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };
  
  const CustomScrollbars = props => (
    <Scrollbars
      renderThumbHorizontal={renderThumb}
      renderThumbVertical={renderThumb}
      {...props}
    />
  );

  //styles for various components
  const mainBoxStyles = {
    maxWidth: '800px',
    minWidth: '400px',
    borderRadius: 'lg',
    overflow: 'hidden',
    padding: 6, 
    backgroundColor: '#292727',
    borderColor: '#bdb9b9'
  }

  const titleBoxStyles = {
    padding: 0,
    backgroundColor: '#292727'
  }

  const iconBoxStyles = {
    padding: 0.5,
    backgroundColor: '#292727',
    width: '2.0em',
    height: '2.0em'
  }

  const dividerStyles = {
    backgroundColor: 'white',
    width: '750px',
    borderWidth: '0px',
    borderRadius: 'lg',
    padding: 0.78,
    borderBottomWidth: '1.78em',
    borderColor: '#292727'
  }

  const tabListStyles = {
    backgroundColor: 'black',
    width: '25em',
    maxWidth: '500px',
    borderRadius: 'lg',
    rounded: 'full',
    borderColor: '#ACACAC',
    borderWidth: '0.08em'
  }

  const tabStyles = {
    color: 'white',
    fontSize: '0.6em',
    _selected: {backgroundColor: '#787777', borderColor: '#ACACAC', borderWidth: '0.08em'}
  }

  const postFlexStyle = {
    borderWidth: '0px', borderRadius: 'lg', paddingTop: '20px'
  }

  const postFlexStyle2 = {
    borderWidth: '0.95px',
    borderRadius: 'lg',
    borderColor: 'white',
    overflow: 'hidden',
    height: '200px',
    width: '700px'
  }

  const gridStyles = {
    columns: 1,
    spacing: 1,
    padding: "0.5em"
  }

  const leftPostBoxStyles = {
    backgroundColor: '#292727',
    width: '100%'
  }

  const postPicStyles = {
    backgroundColor: '#292727',
    size: '150px',
    width: '30%',
    height: '100%',
    padding: '1em'
  }

  const rightPostBoxStyles = {
    flex: 3,
    bg: '#292727'
  }

  const centerStyles = {
    width: '9%',
    backgroundColor: '#292727'
  }

  const textBoxStyles = {
    padding: 0,
    backgroundColor:'#292727'
  }

  const spacerStyle = {
    width: '55%',
    backgroundColor: '#292727'
  }

  const rightPostSectionStyles = {
    flex: '1',
    background: '#292727'
  }

  const gridBoxStyles = {
    height: '100%',
    background: '#292727'
  }

  const mainPostBoxStyles = {
    borderWidth: '0.95px',
    borderRadius: 'lg',
    overflow: 'hidden',
    width: '700px',
    height: '200px',
    backgroundColor: '#292727'
  }

  return (

    <ChakraProvider>
      <Box sx={mainBoxStyles}>
        <Flex>
          <Box sx={titleBoxStyles}>
            <Heading class="heading">Trending Social</Heading>
          </Box>
          <Spacer />
          <Box sx={titleBoxStyles}>
          <Flex>
            <Box sx={iconBoxStyles} >
              <Image class="topicons" src="https://www.citypng.com/public/uploads/preview/hd-white-x-cross-mark-icon-png-31624472741i2gfrqrqgy.png" paddingBottom='3em'/>
            </Box>
              <Spacer />
            <Box sx={iconBoxStyles} >
              <Image class="topicons" src='https://www.citypng.com/public/uploads/preview/hd-white-x-cross-mark-icon-png-31624472741i2gfrqrqgy.png' />
            </Box>
          </Flex>
        </Box>
      </Flex>

      {/* this box below used as a divider, doesn't contain anything  p= controls the weight of the line*/}
      <Box sx={dividerStyles}> </Box> 
   
        {/* tabs for the various posts - only did the page visible from the wireframe... */}
        <Tabs variant='solid-rounded'>
          <TabList sx={tabListStyles}>
            <Tab sx={tabStyles}>Due Dilligence</Tab>
            <Tab sx={tabStyles}>Speculation</Tab>
            <Tab sx={tabStyles}>General</Tab>
            <Tab sx={tabStyles}>Videos</Tab>
            <Tab sx={tabStyles}>All</Tab>
          </TabList>

          <TabPanels>
            <TabPanel> 
                <div className="App">
                  <CustomScrollbars style={{width: '100%', height: 680}}>
                    <div>
                    <Box>
                    <Flex sx={postFlexStyle} >
                            <Flex sx={postFlexStyle2}>
                              {LikeButton()}
                              {/* middle portion of the post - with the post picture */}
                              <Box sx={postPicStyles}>
                                <Image class='postimage' src='https://media.istockphoto.com/id/499292620/photo/old-railway-bridge.webp?s=612x612&w=is&k=20&c=rai1gtEeWEDtUe1OPJ8PPAh0hvPlPthTwv6_9p0yoxk='/>
                              </Box>

                              {/* right section of the post - vertical flex box divided into 3 sections */}
                              <Box sx={rightPostBoxStyles}>
                                      {/* top section */}
                                      <Flex>
                                        <Box sx={textBoxStyles}>
                                          <Text class="posttitle">This is A Post Title</Text>
                                          <Text class="tinytext">Posted at this time by this person</Text>
                                        </Box>
                                      <Spacer />
                                        <Box sx={textBoxStyles}>
                                          <Text class="tinytext">Due Dilligence</Text>
                                        </Box>
                                      </Flex>

                                {/* the second box - middle text section */}
                                <Box sx={rightPostBoxStyles} w='25em' h='6em' >
                                <Text class='postbody'> induectronic typesetting, remaining essentially unchanged. It w into electronic typesetting, rem has been leap into electronic typesetting, rem Lorem Ipsum has been leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing</Text>
                                </Box>
                               
                                {/* the bottom footer of the text secton of the post */}
                                <Flex>

                                  <Center sx={spacerStyle}>
                                    {/* primarily a spacer box, invisible for spacing out content */}
                                  </Center>

                                  <Box sx={rightPostSectionStyles}>

                                    {/* contains a horizontal grid of four elements for the footer of the post */}
                                    <Grid templateColumns='repeat(5, 1fr)' gap={1}>
                                    <GridItem w='90%' sx={gridBoxStyles}> 
                                    <Image class="footicons" src="https://www.citypng.com/public/uploads/preview/hd-white-x-cross-mark-icon-png-31624472741i2gfrqrqgy.png" />
                                    </GridItem>
                                    <GridItem w='120%' sx={gridBoxStyles} > 
                                    <Text class="tinytext">9 fractions</Text>
                                    </GridItem>
                                    <GridItem w='100%' sx={gridBoxStyles} > 
                                    <Image class="footicons" src="https://www.citypng.com/public/uploads/preview/hd-white-x-cross-mark-icon-png-31624472741i2gfrqrqgy.png" />
                                    </GridItem>
                                    <GridItem w='150%' sx={gridBoxStyles}> 
                                    <Text class="tinytext">104 Comments</Text>
                                    </GridItem>
                                    </Grid>

                                  </Box>
                                </Flex>
                              </Box>
                              
                            </Flex>
                      </Flex>
                        <Flex sx={postFlexStyle}>
                          <Box sx={mainPostBoxStyles}/>
                        </Flex>
                        <Flex sx={postFlexStyle}>
                          <Box sx={mainPostBoxStyles} />
                        </Flex>
                        <Flex sx={postFlexStyle}>
                          <Box sx={mainPostBoxStyles}/>
                        </Flex>
                        <Flex sx={postFlexStyle}>
                          <Box sx={mainPostBoxStyles} />
                        </Flex>
                      </Box>
                      </div>
                  </CustomScrollbars>
                </div>
            </TabPanel>
            <TabPanel>
              <p>Speculation posts </p>
            </TabPanel>
            <TabPanel>
              <p>General posts</p>
            </TabPanel>
            <TabPanel>
              <p>Videos posts</p>
            </TabPanel>
            <TabPanel>
              <p>All posts Content</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
       
      </Box>
    </ChakraProvider>
  );
}

export default Post;
