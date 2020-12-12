import styled from "styled-components";
import { Geography } from "react-simple-maps";

export const State = styled(Geography)`
  fill: #a7c5bd;
  stroke: white;
  stroke-width: 2;
`;

export const StateLink = styled.a`
  &:focus {
    path {
      fill: #524656;
    }
  }
`;
