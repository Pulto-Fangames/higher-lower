import { Component, memo } from "react";

import Card from "../../components/Card";

import search from "../../utils/search";
import selectMember from "../../utils/select-member";

import Score from "./components/Score";
import VScard from "./components/VS-card";
import GameOver from "./components/GameOver";

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

    const $start = selectMember("start", $members);
    $members.push(Object.assign($start, { status: "start", count: await search($start.nickname) }));

    const $select = selectMember("select", $members);
    $members.push(Object.assign($select, { status: "select", count: await search($select.nickname) }));

    const $none = selectMember("none", $members);
    $members.push(Object.assign($none, { status: "none", count: await search($none.nickname) }));

    const best = parseInt(localStorage.getItem("CLASSIC_BEST_SCORE") ?? "0");

    this.setState({
      status: "playing",
      scores: { total: 0, best }
    }, () => {
      this.setState({ members: $members, load: true, init: true });
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
      {this.state.status === "fail" && <GameOver
        ments={this.state.ments}
        mentIdx={this.state.mentIdx}
        scores={this.state.scores}
        />}
      {this.state.init && <>
        <div className="flex w-three h-screen">
          {this.state.members.slice(0, 2).find(m => !m.count) && <div className="flex absolute mt-2 ml-4 text-base text-white">오류가 발생했어요.</div>}
          <Score scores={this.state.scores} />
          <VScard status={this.state.status} />
          <div className="flex w-three h-screen">
            {this.state.members?.slice(0, 3).map(($member, $idx) => (
              <Card
                member={$member}
                idx={$idx}
                onClick={(choose) => {
                  if (this.state.members.filter(member => !member.count).length) {
                    const $members: Member[] = [];
                    this.state.members.forEach(async ($member, $idx) => {
                      $members.push($member)
                      $members[$idx].count = await search($member.nickname);
                    });

                    this.setState({ members: $members });
                    alert("오류가 발생했습니다. 다시 시도해주세요.");
                    return;
                  }
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
                          }

                          let mentIdx = Math.floor(this.state.scores.total / 4);
                          if (!this.state.ments[mentIdx]) mentIdx = this.state.ments.length - 1;

                          this.setState({ mentIdx });
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
                            const $new = selectMember("none", this.state.members);
                            const $newMember = Object.assign($new, { status: "none", count: await search($new.nickname) });

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
                              $members.push($newMember);
                              if ($members[0].status === "select") {
                                $members[0].status = "start";
                              }

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