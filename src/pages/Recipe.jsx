import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import styled from "styled-components";
import {useGlobalContext} from "../context";

function Recipe() {
  const [recipeData, setRecipeData] = useState([]);
  const [activeTab, setActiveTab] = useState("instruction");
  const {isLoading, setIsLoading} = useGlobalContext();

  const param = useParams();

  const getRecipeData = async (id) => {
    const res = await fetch(
      `
      https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}
      `
    );
    const data = await res.json();
    setRecipeData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getRecipeData(param.id);
  }, [param.id]);

  if (isLoading) {
    return <h3 className="loading">Loading...</h3>;
  } else {
    return (
      <RecipeDiv>
        <div className="recipe__left">
          <h2>{recipeData.title}</h2>
          <img src={recipeData.image} alt={recipeData.title} />
        </div>

        <div className="recipe__right">
          <div>
            <button
              className={`${activeTab === "instruction" ? "active" : ""}`}
              onClick={() => setActiveTab("instruction")}>
              Instruction
            </button>
            <button
              className={`${activeTab === "ingredient" ? "active" : ""}`}
              onClick={() => setActiveTab("ingredient")}>
              Ingredient
            </button>
          </div>
          {activeTab === "instruction" && (
            <div>
              <h2 dangerouslySetInnerHTML={{__html: recipeData.summary}}></h2>
              <h2
                dangerouslySetInnerHTML={{
                  __html: recipeData.instructions,
                }}></h2>
            </div>
          )}

          {activeTab === "ingredient" && (
            <ul>
              {recipeData.extendedIngredients.map((ingredient) => {
                return <li key={ingredient.id}>{ingredient.original}</li>;
              })}
            </ul>
          )}
        </div>
      </RecipeDiv>
    );
  }
}

const RecipeDiv = styled.div`
  margin: 4rem 0;

  @media (min-width: 992px) {
    margin: 8rem 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .recipe__left {
    width: 90%;
    margin-inline: auto;
    margin-bottom: 1.5rem;
    text-align: center;

    @media (min-width: 992px) {
      width: 40%;
    }

    img {
      width: 100%;
    }
  }

  .recipe__right {
    text-align: center;
    @media (min-width: 992px) {
      width: 50%;
      text-align: start;
    }

    ol {
      text-align: start;
    }

    button {
      padding: 0.75rem 1.5rem;
      background-color: transparent;
      border: 2px solid #383838;
      font-size: 1rem;
      color: #383838;
      margin-right: 1rem;

      &.active {
        color: #fff;
        background-color: #383838;
        font-weight: bold;
      }
    }
  }

  a {
    color: inherit;
  }

  h2 {
    font-size: 1.1rem;
    line-height: 30px;
    margin: 1rem 0rem;

    @media (min-width: 992px) {
      font-size: 1.25rem;
      line-height: 2.5rem;
      margin: 2rem 0rem;
    }
  }

  ul {
    margin: 4rem 0;

    li {
      margin: 1rem 0;
      font-size: 1.25rem;
    }
  }
`;

export default Recipe;
