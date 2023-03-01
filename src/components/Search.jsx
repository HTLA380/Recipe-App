import styled from "styled-components";
import {FaSearch} from "react-icons/fa";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search/" + input);
    setInput("");
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit}>
        <FaSearch />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </SearchBar>
    </div>
  );
}

const SearchBar = styled.form`
  margin-top: 3rem;
  background: linear-gradient(35deg, #494949, #313131);
  display: flex;
  justify-content: start;
  padding: 0 2rem;
  border-radius: 100vmax;
  align-items: center;
  max-width: 800px;
  margin-inline: auto;

  svg {
    color: #fff;
  }

  input {
    color: #fff;
    background-color: transparent;
    border: none;
    width: 100%;
    letter-spacing: 1px;
    font-size: 1rem;
    padding: 1rem;
    outline: none;
  }
`;

export default Search;
