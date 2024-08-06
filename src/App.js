import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { darkTheme, lightTheme } from './utils/Themes.js';
import Navbar from "./components/Navbar";
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import HeroSection from "./components/HeroSection";

import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import Education from "./components/Education";
import ProjectDetails from "./components/ProjectDetails";

import styled from "styled-components";
import Starfield from "./components/Background/index.js";
import EarthCanvas from "./components/Globe/index.js";

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
  position: relative;
  z-index: 1; /* Added */
`;

const Wrapper = styled.div`
  background: linear-gradient(38.73deg, rgba(204, 0, 187, 0.15) 0%, rgba(201, 32, 184, 0) 50%), linear-gradient(141.27deg, rgba(0, 70, 209, 0) 50%, rgba(0, 70, 209, 0.15) 100%);
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%,30% 98%, 0 100%);
  position: relative;
  z-index: 2; 
`;

const Content = styled.div`
  position: relative;
  z-index: 2; 
`;

function App() {
  const [darkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Navbar />
        <Body>
          <Starfield/>
          <Content>
            <HeroSection />
            <Wrapper>
              <Skills />
            </Wrapper>
            <Projects openModal={openModal} setOpenModal={setOpenModal} />
            <Wrapper>
              <Education />
              <div className="earth-canvas-container mt-10">
                <EarthCanvas />
              </div>
              <Contact />
            </Wrapper>
            <Footer />
            {openModal.state &&
              <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
            }
          </Content>
        </Body>
      </Router>
    </ThemeProvider>
  );
}

export default App;
