import styled from "styled-components";
import { Geography } from "react-simple-maps";

export const State = styled(Geography)`
  fill: #a7c5bd;

  &:focus {
    fill: #524656;
  }

  stroke: white;
  stroke-width: 2;
`;
