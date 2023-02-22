import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      text-decoration: none;
  }

  html {
      scroll-behavior: smooth;
  }

  html, body {
      width: 100%;
      height: 100%;
  }

  body {
      overflow: overlay;
  }

  ul {
      list-style: none;
  }

  button  {
          cursor: pointer; 
  }
`;

export default GlobalStyle;
