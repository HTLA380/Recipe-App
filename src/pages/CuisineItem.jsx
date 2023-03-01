import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import styled from "styled-components";
import {useGlobalContext} from "../context";

function CuisineItem() {
  const {isLoading, setIsLoading} = useGlobalContext();
  const param = useParams();
  const [cuisine, setCuisine] = useState([]);

  const fetchData = async (name) => {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
    );

    const data = await res.json();
    setCuisine(data.results);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData(param.type);
  }, [param.type]);

  if (isLoading) {
    return <h3 className="loading">Loading...</h3>;
  }
  return (
    <CuisineDiv>
      {cuisine.map((item) => {
        return (
          <Card key={item.title}>
            <Link to={"/recipe/" + item.id}>
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
            </Link>
          </Card>
        );
      })}
    </CuisineDiv>
  );
}

const CuisineDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  margin-bottom: 2rem;

  a {
    text-decoration: none;
  }

  img {
    width: 100%;
    border-radius: 1rem;
  }

  h3 {
    text-align: center;
    margin-top: 1rem;
    font-size: 1rem;
    color: #383838;
  }
`;

export default CuisineItem;
