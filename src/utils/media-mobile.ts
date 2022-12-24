import {css} from "styled-components";

export default (...args: string[]) => css`
  @media (max-width: 768px) {
    ${args}
  }
`;