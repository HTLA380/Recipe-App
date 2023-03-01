import {useEffect, useState} from "react";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import styled from "styled-components";
import {Link} from "react-router-dom";

function Popular() {
  const [popularData, setPopularData] = useState([]);

  const localStoragePopular = localStorage.getItem("popular");

  useEffect(() => {
    fetchPopularData();
  }, []);

  const fetchPopularData = async () => {
    if (localStoragePopular) {
      setPopularData(JSON.parse(localStoragePopular));
    } else {
      const res = await fetch(`
      https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9
      `);
      const data = await res.json();
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      setPopularData(data.recipes);
    }
  };

  return (
    <section>
      <h2>Popular Picks</h2>

      <Splide
        options={{
          perPage: 4,
          gap: "3rem",
          arrows: false,
          pagination: false,
          breakpoints: {
            1200: {
              perPage: 3,
            },
            992: {
              perPage: 2,
            },
            700: {
              perPage: 1,
            },
          },
        }}>
        {popularData.map((popular) => {
          return (
            <SplideSlide key={popular.title}>
              <Card key={popular.title}>
                <Overlay to={"recipe/" + popular.id}>
                  <h4>{popular.title}</h4>
                </Overlay>
                <img src={popular.image} alt={popular.title} />
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
  text-decoration: none;
  top: 0;
  left: 0;
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

export default Popular;
