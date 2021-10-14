/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import './App.css';

import UploadForm from "./UploadForm";
import Container from "./Container";


function App() {
  return (
    <Container>
      <h1 css={{ textAlign: "center" }}>Звичайна форма загрузки фотографії</h1>
      <UploadForm/>
    </Container>
  );
}

export default App;
