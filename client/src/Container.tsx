/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React from "react";

const CSS = css`
    width: min(40ch, 100% - 2em);
    margin: 0 auto;
`;  

type Props = {
    children: React.ReactNode
}

const Container = ({ children }: Props) => {
    return (
        <div css={CSS}>{ children }</div>
    );
}

export default Container;