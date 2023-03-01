import Home from "./Home";
import {Routes, Route} from "react-router-dom";
import CuisineItem from "./CuisineItem";
import SearchItem from "./SearchedItem";
import Recipe from "./Recipe";

function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cuisine/:type" element={<CuisineItem />} />
      <Route path="/search/:query" element={<SearchItem />} />
      <Route path="/recipe/:id" element={<Recipe />} />
    </Routes>
  );
}

export default Pages;
