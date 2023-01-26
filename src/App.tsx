import { Routes, Route } from "react-router-dom"
import styled from "styled-components"

import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import CreateProject from "./components/CreateProject"
import Projects from "./components/Projects"

const AppWrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
` 

const App = () => {
    return <AppWrapper>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/create" element={<CreateProject />} />
            <Route path="/about" element={<h1>About</h1>} />
            <Route path="/contact" element={<h1>Contact</h1>} />
        </Routes>
        <Footer />
    </AppWrapper >
}

export default App