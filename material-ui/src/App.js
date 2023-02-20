import React from "react";
import "./App.css";
import { CssBaseline } from "@mui/material";
import Header from "./components/Header";
import { Description } from "./components/Description";
import CardList from "./components/CardList";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <main>
        <Description />
        <CardList />
      </main>
      <Footer />
    </>
  );
}

export default App;
