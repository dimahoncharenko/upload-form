/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React, { useState, useCallback, FormEvent, ChangeEvent, useRef } from 'react';
import { request } from "graphql-request";
import { gql } from "graphql-tag";

const query = gql`
  mutation($input: PhotoArgs!) {
    postPhoto(input: $input) {
      id
      url
      description
      category
      createdAt
    }
  }
`;

const CSS = css`
  display: flex;
  flex-direction: column;

  > input[type="text"],
  > input[type="file"],
  > .form__select,
  > .form__submit
  {
    padding: .5em;
    border-radius: .2em;
    border: .1em solid gray;
    
  }

  > .form__upload::file-selector-button
  {
    border: 2px solid #6c5ce7;
    padding: .2em .4em;
    border-radius: .2em;
    background-color: #a29bfe;
    transition: 1s;
    cursor: pointer;

    &:hover
    {
      background-color: #81ecec;
      border: 2px solid #00cec9;
    }
  }

  > .form__submit
  {
    background-color: hsl(160deg, 80%, 70%);
    border: .1em solid hsl(160deg, 80%, 50%);
    cursor: pointer;
    transition: all .3s linear;

    &:hover
    {
      background-color: hsl(190deg, 80%, 70%);
      border: .1em solid hsl(190deg, 80%, 50%);
    }
  }

`;

type State = {
    category: string,
    description: string
  }

const UploadForm = () => {
    const [state, setState] = useState<State>({
        category: "SELFIE",
        description: ""
      });
    
      const file = useRef<HTMLInputElement>(null);
    
      const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setState(state => ({
          ...state,
          [e.target.name]: e.target.value
        }))
      }, []);
    
      const handleSubmit = useCallback(async (e: FormEvent) => {
        if (file.current && file.current.files) {
          e.preventDefault();
        
          await request("http://localhost:5000/graphql", query, { input: { ...state, file: file.current.files[0] } });
      
          setState({
            category: "SELFIE",
            description: ""
          });
        }
      }, [file, state]);
    
      return (
          <form css={CSS} className="form" onSubmit={(e) => handleSubmit(e)}>
            <input name="description" onChange={handleChange} value={state.description} type="text" placeholder="Description of photo"/>
            <select className="form__select" onChange={handleChange} name="category" value={state.category}>
              <option value="ACTION">ACTION</option>
              <option value="SELFIE">SELFIE</option>
              <option value="PORTRAIT">PORTRAIT</option>
            </select>
            <input className="form__upload" id="upload" ref={file} name="file" type="file" placeholder="Select your image"/>
            <button className="form__submit" type="submit">Відправити</button>
          </form>
      );
}

export default UploadForm;