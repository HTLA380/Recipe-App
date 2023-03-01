import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import styled from "styled-components";
import {useGlobalContext} from "../context";

function SearchItem() {
  const param = useParams();
  const [searchData, setSearchData] = useState([]);
  const {isLoading, setIsLoading} = useGlobalContext();

  const fetchData = async (name) => {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
    );

    const data = await res.json();
    setSearchData(data.results);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData(param.query);
  }, [param.query]);

  if (isLoading) {
    return <h3 className="loading">Loading...</h3>;
  } else {
    return (
      <CuisineDiv>
        {searchData.map((item) => {
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
}

const CuisineDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  margin-bottom: 2rem;

  img {
    width: 100%;
    border-radius: 1rem;
  }

  a {
    text-decoration: none;
  }

  h3 {
    text-align: center;
    margin-top: 1rem;
    font-size: 1rem;
    color: #383838;
  }
`;

export default SearchItem;
