import React, { useState, useContext } from "react";
import styled from "styled-components";
import { INPUTS, BUTTONS } from "..";
import { useInput } from "../../hooks/useInput";

const SearchBarBlock = styled.div`
  position: relative;
  padding-right: 120px;

  > button {
    width: 100px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    border: none;
  }
`;

function SearchBar({ inputId, callback, initialState }) {
  const [values, setValues] = useInput(initialState);
  const onClick = () => {
    onReset();
    if (callback) callback();
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onReset();
      if (callback) callback();
    }
  };
  const onChange = () => {};
  return <SearchBarBlock></SearchBarBlock>;
}

export default React.memo(SearchBar);
