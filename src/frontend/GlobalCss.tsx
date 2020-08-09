import { css, Global } from "@emotion/core";
import React, { memo } from "react";

const styles = css`
  html,
  body {
    background-color: #2f3136;
    color: #dcddde;
    /* TODO: font */
    font-family: Whitney, Helvetica Neue, Helvetica, Arial, sans-serif;
  }
`;

const GlobalCss = () => <Global styles={styles} />;

export default memo(GlobalCss);
