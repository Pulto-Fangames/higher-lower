import { useState } from "react";
import Button from "../components/Button";

import selectMember from "../utils/select-member";

function Main() {
  const [member] = useState<Member>(selectMember("none"));

  return (
    <>
      <div className="preview absolute z-50 bottom-0 right-0 hidden md:block">
        <span className="desc absolute text-xl text-white">❓ 랜덤 키워드:</span>
        <span className="absolute font-bold text-2xl text-white">{member.nickname}</span>
        <div className="preview-bg rounded-full w-80 h-80 mb-5 mr-5"  style={{ background: `linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, .6)) 50% 50% / auto 100% no-repeat, #000000 url(${member.imageUrl}) 0% 0% / cover no-repeat` }} />
      </div>
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
            window.location.href = "/game";
          }}
          >
          <span>게임 시작</span>
        </Button>
      </div>
    </>
  );
}

export default Main;