import {GiKnifeFork} from "react-icons/gi";
import styled from "styled-components";
import {Link} from "react-router-dom";

function Logo() {
  return (
    <TitleDiv to="/">
      <GiKnifeFork />
      <h3>delicious</h3>
    </TitleDiv>
  );
}

const TitleDiv = styled(Link)`
  margin-bottom: 5rem;
  color: #222;

  svg {
    font-size: 2rem;
  }

  h3 {
    display: inline-block;
    font-size: 1.5rem;
    font-weight: normal;
    font-family: cursive !important;
  }
`;

export default Logo;
