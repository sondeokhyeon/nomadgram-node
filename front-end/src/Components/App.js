import React from 'react';
import { gql } from "apollo-boost";
import styled, {ThemeProvider} from "styled-components";
import { HashRouter as Router } from "react-router-dom";
import Theme from "../Styles/Theme"
import GlobalStyles from "../Styles/GlobalStyles"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Routes from "./Router"
import { useQuery } from "react-apollo-hooks"
import Footer from "../Components/Footer"
import Header from "../Components/Header"

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 935px;
  width: 100%;
`;

export default () => {
  const { data : { isLoggedIn } } = useQuery(QUERY);
  return (
    <ThemeProvider theme={Theme}>
    <>
      <GlobalStyles />
      <Router>
        <>
          <Header />
          <Wrapper>
            <Routes isLoggedIn={isLoggedIn} />
            <Footer/>
          </Wrapper>
        </>
      </Router>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT}/>
    </>
    </ThemeProvider>
  );
};