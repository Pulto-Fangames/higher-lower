import styled from "styled-components";
import Button from "../components/Button";

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 6rem;

  img.logo {
    transition: 0.5s;

    &:nth-child(1) {
      width: 11rem;
      animation: Higher 1s ease-in-out .5s infinite alternate;
    }

    &:nth-child(2) {
      width: 11rem;
      animation: Lower 1s ease-in-out .5s infinite alternate;
    }

    @media (min-width: 768px) {
      &:nth-child(1) {
        width: 15rem;
      }

      &:nth-child(2) {
        width: 15rem;
      }
    }

    @keyframes Higher {
      0% {
        transform: translateY(5em);
      }
    
      100% {
        transform: translateY(4.5em);
      }
    }
    
    @keyframes Lower {
      0% {
        transform: translateY(5em);
      }
    
      100% {
        transform: translateY(5.5em);
      }
    }
  }
`;

const Description = styled.div`
  font-family: "Goseogu";
  text-align: center;
  color: white;
  font-size: 1.875rem;
  line-height: 2.25rem;

  span.keyword {
    font-weight: bold;
    color: var(--waktaverse);
  }

  span.desc {
    font-style: italic;

    span.high {
      font-weight: bold;
      color: rgb(59 130 246);
    }
  }

  @media (min-width: 768px) {
    font-size: 3rem;
    line-height: 1;
  }
`;

const SearchResult = styled.div`
  color: rgb(156 163 175);
  text-align: center;
  margin-top: 1.25rem;
  font-size: 0.75rem;
  line-height: 1rem;

  @media (min-width: 768px) {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 1.25rem;
`;

function Main() {
  return (
    <>
      <LogoContainer>
        <img alt="higher" className="logo" src="/assets/logo/higher.png" />
        <img alt="lower" className="logo" src="/assets/logo/lower.png" />
      </LogoContainer>
      <Description>
        <span className="keyword">왁타버스 키워드</span>
        <br />
        <span className="desc">중 무엇이 <span className="high">더 많이</span> 검색되었을까?</span>
      </Description>
      <SearchResult>검색결과량은 구글 한국어 웹 기준으로 합니다.</SearchResult>
      <ButtonContainer>
        <Button style="primary"
          onClick={() => {
            window.location.href = "/game";
          }}
          >
          <span>게임 시작</span>
        </Button>
      </ButtonContainer>
    </>
  );
}

export default Main;
