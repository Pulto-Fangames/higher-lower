import styled from "styled-components";
import Button from "../components/Button";

const Screen = styled.div`
  text-align: center;
  justify-content: center;
  height: 100vh;
`;

const TextContainer = styled.div`
  display: grid;
  justify-content: center;
  box-sizing: border-box;
  text-align: center;
  align-items: baseline;
  padding-top: 13rem;
  filter: drop-shadow(0 0.5px 0.5em rgb(196, 107, 107));
  text-shadow: 0px 0px 20px rgb(196, 107, 107);
`;

const HTTPStatus = styled.span`
  color: rgb(229 231 235);
  font-size: 2.25rem;
  line-height: 2.5rem;

  @media (min-width: 768px) {
    font-size: 3.75rem;
    line-height: 1;
  }
`;

const Hentai = styled.span`
  margin-top: 0.25rem;
  color: rgb(229 231 235);
  font-size: 1.125rem;
  line-height: 1.75rem;

  @media (min-width: 768px) {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
`;

function NotFound() {
  return (
    <Screen>
      <TextContainer>
        <HTTPStatus>4 0 4</HTTPStatus>
        <Hentai>해당 페이지는 공사 중이거나 찾을 수 없습니다.</Hentai>
      </TextContainer>
      <Button
        style="secondary"
        onClick={() => {
          window.location.href = "/";
        }}
        >
        <span>돌아가기</span>
      </Button>
    </Screen>
  );
}

export default NotFound;
