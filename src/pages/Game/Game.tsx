import { Component } from "react";

import Card from "../../components/Card";
import Button from "../../components/Button";

import search from "../../utils/search";
import selectMember from "../../utils/select-member";

import Score from "./components/Score";
import VScard from "./components/VS-card";

interface S {
  members: Member[];
  status: "playing" | "success" | "fail" | "none";
  scores: {
    best: number;
    total: number;
  };
  mentIdx: number;
  ment?: string;
  ments: string[][];
  init: boolean;
  load: boolean;
}

export default class MainGame extends Component<{}, S> {
  constructor(props: {}) {
    super(props);

    this.state = {
      members: [],
      status: "none",
      scores: { best: 0, total: 0 },
      mentIdx: 0,
      ments: [
        ["더 잘할 수 있죠?", "엌ㅋㅋㅋㅋㅋㅋㅋ", "(토닥토닥)", "운이 없는거 아닌가요?"],
        ["헉!!!!!!!!!", "정말 잘하시네요!", "조금 더 정진해봅시다."],
        ["잘 했는데... 아쉽네요.", "어라... 뭐지?"],
        ["이 점수에서 틀리네 ㅋㅋㅋ", "손이 미끄러지셨나요?"],
        ["더 이상 할말이 없어요.", "......"],
        ["레게노"]
      ],
      init: false,
      load: false
    };
  }

  async componentDidMount() {
    const $members: Member[] = [];
    let $idx = 0;
    
    for (const status of ["start", "select", "none"] as Status[]) {
      const $member = selectMember(status, $members);
      $members.push($member);

      $members[$idx].count = await search($member.nickname);

      $idx++;
    }

    const best = parseInt(localStorage.getItem("CLASSIC_BEST_SCORE") ?? "0");

    this.setState({
      members: $members,
      status: "playing",
      scores: { total: 0, best }
    }, () => {
      this.setState({ load: true, init: true });
    });
  }

  render() {
    return (<>
      {!this.state.load && <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 focus:outline-none">
        <div className="relative z-50 text-center text-3xl">
          <span className="text-white">
            <div className="flex">
              <svg className="animate-spin -ml-1 mr-3 h-9 w-9 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {this.state.ment ?? "로딩 중"}
            </div>
            {typeof this.state.ment !== "string" && <div className="text-gray-400 text-base">시간이 꽤 걸릴 수 있습니다.</div>}
          </span>
        </div>
        <div className="fixed inset-0 z-40 bg-black opacity-50" />
      </div>}
      {this.state.status === "fail" && <div className="flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 focus:outline-none">
        <div className="relative z-50 mt-20 mx-auto text-3xl">
          <span className="text-rose-600 text-5xl font-[Goseogu]">게임 오버!</span>
          <div className="mt-4 text-white font-bold">
            <div>당신의 점수는</div>
            <div className="mt-2 text-gray-400">
              <span>{this.state.scores.total.toLocaleString()}점</span>
              <span className="text-base">{this.state.ments[this.state.mentIdx][Math.floor(this.state.ments[this.state.mentIdx].length * Math.random())]}</span>
            </div>
          </div>
          <div className="mt-4 text-white font-bold">
            <div>최고 점수는</div>
            <div className="flex mt-2 text-gray-400">
              <span>{this.state.scores.best}점</span>
              {this.state.scores.best < this.state.scores.total && <>
                <span>&gt;</span>
                <span className="flex text-bestscore">
                  {this.state.scores.total.toLocaleString()}점
                  <div className="bestscore text-2xl text-bestscore font-bold">(+{this.state.scores.total - this.state.scores.best})</div><div className="bestscore text-2xl text-bestscore font-bold">(+{this.state.scores.total - this.state.scores.best})</div>v
                </span>
              </>}
            </div>
          </div>
          <Button
            style="secondary"
            className="text-xl ml-0 mt-2 p-1"
            onClick={() => {
              location.reload();
            }}
            >
            <span>다시하기</span>
          </Button>
        </div>
        <div className="fixed inset-0 z-40 bg-black opacity-50" />
      </div>}
      {this.state.init && <>
        <div className="flex w-three h-screen">
          {this.state.members.slice(0, 2).find(m => !m.count) && <div className="flex absolute mt-2 ml-4 text-xl text-white">
            오류가 발생했어요.
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2 cursor-pointer" onClick={() => {
              this.setState({ ment: undefined, load: false }, async () => {
                const $members: Member[] = [];
                for (const $member of this.state.members) {
                  if (!$member.count) {
                    $member.count = await search($member.nickname);
                  }
                  $members.push($member);
                }

                this.setState({
                  members: $members,
                  load: true
                });
              });
            }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </div>}
          <Score scores={this.state.scores} />
          <VScard status={this.state.status} />
          <div className="flex w-three h-screen">
            {this.state.members?.slice(0, 3).map($member => (
              <Card
                id={$member.id}
                count={$member.count}
                status={$member.status}
                onClick={(choose) => {
                  if (this.state.members) {
                    const $compared = this.state.members[0];
                    if ($compared.count !== undefined && $member.count !== undefined) {
                      this.setState({
                        members: this.state.members.map(member => {
                          if (member.id === $member.id) {
                            member.status = "selected";
                          }
                          return member;
                        }),
                        status: (choose === "high" && $compared.count <= $member.count) || (choose === "low" && $compared.count > $member.count)
                          ? "success"
                          : "fail"
                      }, () => {
                        if (this.state.status === "fail") {
                          if (this.state.scores.best < this.state.scores.total) {
                            localStorage.setItem("CLASSIC_BEST_SCORE", this.state.scores.total.toString());
                            this.setState({ mentIdx: Math.floor(this.state.scores.total / 4) });
                          }
                          return;
                        }

                        setTimeout(() => {
                          this.setState({
                            ment: "새 키워드 뽑는 중...",
                            load: false,
                            scores: {
                              best: parseInt(localStorage.getItem("CLASSIC_BEST_SCORE") ?? "0"),
                              total: (this.state.scores?.total ?? 0) + (this.state.status === "success" ? 1 : 0)
                            }
                          }, async () => {
                            const newMember = selectMember("none", this.state.members);
                            newMember.count = await search($member.nickname);

                            this.state.members.forEach(member => {
                              const memberElement: HTMLDivElement | null = document.querySelector(`div#${member.id}`);
                              if (memberElement) {
                                memberElement.classList.add("moving");
                              }
                            });
                            setTimeout(async () => {
                              const $members: Member[] = [];
                              for (const $member of this.state.members) {
                                const memberElement: HTMLDivElement | null = document.querySelector(`div#${$member.id}`);
                                if (memberElement) {
                                  memberElement.classList.remove("moving");
                                }

                                if ($member.status === "start") continue;
                                if ($member.status === "selected") {
                                  $members.push(Object.assign($member, { status: "start" }));
                                  continue;
                                }
                                if ($member.status === "none") {
                                  $members.push(Object.assign($member, { status: "select" }));
                                  continue;
                                }
                              }
                              $members.push(newMember);
                              if ($members[0].status === "select") {
                                $members[0].status = "start";
                              }

                              $members.slice(-2).forEach(async ($member, idx) => {
                                $members[idx].count = await search($member.nickname);
                              });

                              this.setState({
                                members: $members,
                                load: true,
                                ment: undefined,
                                status: "playing"
                              });
                            }, 800);
                          });
                        }, 800);
                      });
                    }
                  }
                }}
                key={$member.id}
                />
            ))}
          </div>
        </div>
      </>}
    </>);
  }
}