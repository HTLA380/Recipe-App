import {useEffect, useState} from "react";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";
import styled from "styled-components";

import {Link} from "react-router-dom";

function Veggie() {
  const [veggieData, setVeggieData] = useState([]);

  const localStorageVeggie = localStorage.getItem("veggie");

  useEffect(() => {
    fetchVeggieData();
  }, []);

  const fetchVeggieData = async () => {
    if (localStorageVeggie) {
      setVeggieData(JSON.parse(localStorageVeggie));
    } else {
      const res = await fetch(`
      https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian
      `);
      const data = await res.json();
      localStorage.setItem("veggie", JSON.stringify(data.recipes));
      setVeggieData(data.recipes);
    }
  };

  return (
    <section>
      <h2>Vegetarian Picks</h2>

      <Splide
        options={{
          perPage: 3,
          gap: "3rem",
          arrows: false,
          pagination: false,
          breakpoints: {
            1200: {
              perPage: 2,
            },
            700: {
              perPage: 1,
            },
          },
        }}>
        {veggieData.map((veggie) => {
          return (
            <SplideSlide key={veggie.title}>
              <Card key={veggie.title}>
                <Overlay to={"recipe/" + veggie.id}>
                  <h4>{veggie.title}</h4>
                </Overlay>
                <img src={veggie.image} alt={veggie.title} />
              </Card>
            </SplideSlide>
          );
        })}
      </Splide>
    </section>
  );
}

const Card = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  min-height: 25rem;
  position: relative;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    min-height: 20rem;
  }

  img {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const Overlay = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  text-decoration: none;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.5)
  );
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  z-index: 3;
  height: 100%;

  h4 {
    max-width: 80%;
    margin: 3rem 0;
    color: #ebebeb;

    @media (max-width: 768px) {
      margin: 1.5rem 0;
      font-size: 1rem;
      font-weight: 500;
    }
  }
`;

export default Veggie;
