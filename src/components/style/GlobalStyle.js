import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    padding: 0; margin:0;box-sizing:border-box;
  }

  html {font-size:10px;}

  body {line-height:1.4;}

  ul, ol {list-style:none;}
  a {text-decoration:none;}
`;

export default GlobalStyle;