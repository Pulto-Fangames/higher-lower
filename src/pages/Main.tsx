import Button from "../components/Button";

function Main() {
  return (
    <>
      <div className="flex justify-center mb-24">
        <img alt="higher" className="logo w-44 md:w-60" src="/assets/logo/higher.png" />
        <img alt="lower" className="logo w-44 md:w-60" src="/assets/logo/lower.png" />
      </div>
      <div className="font-[Goseogu] text-center text-white text-3xl md:text-5xl">
        <span className="font-bold text-waktaverse">왁타버스 키워드</span>
        <br />
        <span className="italic">중 무엇이 <span className="font-bold text-blue-500">더 많이</span> 검색되었을까?</span>
      </div>
      <div className="mt-5 text-center text-xs md:text-sm text-gray-400">
        검색결과량은 구글 한국어 웹 기준으로 합니다.
      </div>
      <div className="text-center mt-5">
        <Button
          style="primary"
          onClick={() => {
            window.location.href = "/game/classic";
          }}
          >
          <span>게임 시작</span>
        </Button>
      </div>
    </>
  );
}

export default Main;