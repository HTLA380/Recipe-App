import React from "react";
import styled from "styled-components";
import {FaPizzaSlice} from "react-icons/fa";
import {FaHamburger} from "react-icons/fa";
import {GiNoodles} from "react-icons/gi";
import {GiChopsticks} from "react-icons/gi";
import {NavLink} from "react-router-dom";

function Category() {
  return (
    <CuisineContainer>
      <CuisineButton to="/cuisine/italian">
        <FaPizzaSlice />
        <h5>Italian</h5>
      </CuisineButton>
      <CuisineButton to="/cuisine/american">
        <FaHamburger />
        <h5>American</h5>
      </CuisineButton>
      <CuisineButton to="/cuisine/thai">
        <GiNoodles />
        <h5>Thai</h5>
      </CuisineButton>
      <CuisineButton to="/cuisine/japanese">
        <GiChopsticks />
        <h5>Japanese</h5>
      </CuisineButton>
    </CuisineContainer>
  );
}

const CuisineContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem 0;
  gap: 3rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }

  @media (max-width: 576px) {
    gap: 1rem;
  }
`;

const CuisineButton = styled(NavLink)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: none;
  display: flex;
  text-decoration: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(35deg, #494949, #313131);
  cursor: pointer;
  gap: 0.2rem;
  padding: 0.2rem;

  @media (max-width: 576px) {
    width: 60px;
    height: 60px;
  }

  &.active {
    background: linear-gradient(to right, #f27121, #e94057);
  }

  h5 {
    color: #fff;
    font-size: 0.8rem;

    @media (max-width: 576px) {
      font-weight: normal;
      font-size: 10px;
    }
  }

  svg {
    font-size: 1rem;
    color: #fff;
  }
`;

export default Category;
