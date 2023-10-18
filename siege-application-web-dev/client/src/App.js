import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Container } from "@chakra-ui/react";

import "./App.css";
import Main from "./components/main/Main";
import Navbar from "./components/navbar/Navbar";
import Post from "./components/main/posts";

function App() {
  return (
    <HashRouter>
      <React.Fragment>
      <Navbar/>

        <Container maxW="100vw" height="100vh" bg="blue.600" color="white">
          {/* https://chakra-ui.com/docs/components/container */}

          <Routes>
            {/* <Route exact path="/" element={<Main />}></Route> */}
            <Route exact path="/" element={<Post />}></Route>
          </Routes>

        </Container>

      </React.Fragment>
    </HashRouter>
  );
}

export default App;
