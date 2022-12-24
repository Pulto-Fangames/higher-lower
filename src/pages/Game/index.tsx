import { Component } from "react";
import styled from "styled-components"
import ments from "../../utils/ments";
import search from "../../utils/search";
import selectMember from "../../utils/select-member";
import Score from "./components/Score";
import Card from "../../components/Card";
import VScard from "./components/VS-card";
import GameOver from "./components/GameOver";

interface S {
  members: Member[];
  words: Member[];
  status: "playing" | "success" | "fail" | "none";
  scores: {
    best: number;
    total: number;
  };
  mentIdx: number;
  ment?: string;
  init: boolean;
  load: boolean;
}

const Loading = styled.div`
  position: fixed;
  justify-content: center;
  align-items: center;
  display: flex;
  overflow-x: hidden;
  overflow-y: auto;
  inset: 0;
  z-index: 50;

  &:focus {
    outline: none;
  }
`;

const LoadingBackground = styled.div`
  position: relative;
  z-index: 50;
  text-align: center;
  font-size: 1.875rem;
  line-height: 2.25rem;

  span.content {
    color: white;
  }
`;

const LoadingAwning = styled.div`
  position: fixed;
  inset: 0;
  z-index: 40;
  background-color: black;
  opacity: 0.5;
`;

const LoadingSpin = styled.svg`
  animation: spin 1s linear infinite;
  margin-left: -0.25rem;
  margin-right: 0.75rem;
  width: 2.25rem;
  height: 2.25rem;
  color: white;

  circle {
    opacity: 0.25;
  }

  path {
    opacity: 0.75;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Screen = styled.div`
  display: flex;
  width: 150%;
  height: 100vh;
`;

const Cards = styled.div`
  display: flex;
  width: 150%;
  height: 100vh;

  div.card {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
      & { width: 100vw; }
    }

    div.content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  
  @media (max-width: 768px) {
    & {
      width: 100%;
      height: 150%;
      flex-direction: column;
    }
  }
`;

const Error = styled.div`
  position: absolute;
  margin-top: 0.5rem;
  margin-left: 1rem;
  font-size: 1rem;
  line-height: 1.5rem;
  color: white;
`;

export default class MainGame extends Component<{}, S> {
  constructor(props: {}) {
    super(props);

    this.state = {
      members: [],
      words: [],
      status: "none",
      scores: { best: 0, total: 0 },
      mentIdx: 0,
      init: false,
      load: false
    };
  }

  async componentDidMount() {
    const members: Member[] = [];

    const start = selectMember("start", members);
    members.push({...start, status: "start", count: await search(start)});

    const select = selectMember("select", members);
    members.push({ ...select , status: "select", count: await search(select) });

    const none = selectMember("none", members);
    members.push({ ...none, status: "none", count: await search(none) });

    const best = parseInt(localStorage.getItem("CLASSIC_BEST_SCORE") ?? "0");

    this.setState({
      status: "playing",
      scores: { total: 0, best }
    }, () => {
      this.setState({ members, words: members, load: true, init: true });
    });
  }

  render() {
    return (<>
      {!this.state.load && <Loading>
        <LoadingBackground>
          <span className="content">
            <div>
              <LoadingSpin xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </LoadingSpin>
              {this.state.ment ?? "로딩 중"}
            </div>
            {typeof this.state.ment !== "string" && <div className="text-gray-400 text-base">시간이 꽤 걸릴 수 있습니다.</div>}
          </span>
        </LoadingBackground>
        <LoadingAwning />
      </Loading>}
      {this.state.status === "fail" && <GameOver ments={ments} mentIdx={this.state.mentIdx} scores={this.state.scores} />}
      {this.state.init && <>
        <Screen>
          {this.state.members.slice(0, 2).find(m => !m.count) && <Error>오류가 발생했어요.</Error>}
          <Score scores={this.state.scores} />
          <VScard status={this.state.status} />
          <Cards>
            {this.state.members?.slice(0, 3).map((mmember, $idx) => (
              <Card
                member={mmember}
                idx={$idx}
                onClick={(choose) => {
                  if (this.state.members.filter(member => !member.count).length) {
                    const load = new Audio("/assets/sound/load.mp3");
                    load.volume = .5;
                    load.play();

                    this.setState({ment: "잠시만 기다려주세요...", load: false}, async () => {
                      const members: Member[] = [];
                      for (const member of this.state.members) {
                        if (!member.count) member.count = await search(member);
                        members.push(member);
                      }
      
                      this.setState({members, load: true, ment: undefined});
                    });
                    return;
                  }
                  if (this.state.members) {
                    const compared = this.state.members[0];
                    if (compared.count !== undefined && mmember.count !== undefined) {
                      this.setState({
                        members: this.state.members.map(member => {
                          if (member.id === mmember.id) member.status = "selected";
                          return member;
                        }),
                        status: (choose === "high" && compared.count <= mmember.count) || (choose === "low" && compared.count > mmember.count)
                          ? "success"
                          : "fail"
                      }, () => {
                        const status = new Audio(`/assets/sound/${this.state.status}.mp3`);
                        status.volume = .5;
                        status.play();

                        if (this.state.status === "fail") {
                          if (this.state.scores.best < this.state.scores.total) {
                            localStorage.setItem("CLASSIC_BEST_SCORE", this.state.scores.total.toString());
                          }

                          let mentIdx = Math.floor(this.state.scores.total / 4);
                          if (!ments[mentIdx]) mentIdx = length - 1;

                          this.setState({mentIdx});
                          return;
                        }

                        setTimeout(() => {
                          this.setState({
                            ment: "새 키워드 고르는 중...",
                            load: false,
                            scores: {
                              best: parseInt(localStorage.getItem("CLASSIC_BEST_SCORE") ?? "0"),
                              total: (this.state.scores?.total ?? 0) + (this.state.status === "success" ? 1 : 0)
                            }
                          }, async () => {
                            const newm = selectMember("none", this.state.words);
                            const newMember: Member = {...newm, status: "none", count: await search(newm)};

                            const next = new Audio("/assets/sound/next.mp3");
                            next.volume = .5;
                            next.play();
                            
                            this.state.members.forEach(member => {
                              const memberElement: HTMLDivElement | null = document.querySelector(`div#${member.id}`);
                              if (memberElement) memberElement.classList.add("moving");
                            });
                            setTimeout(async () => {
                              const mmembers: Member[] = [];
                              for (const mmember of this.state.members) {
                                const memberElement: HTMLDivElement | null = document.querySelector(`div#${mmember.id}`);
                                if (memberElement) memberElement.classList.remove("moving");

                                if (mmember.status === "start") continue;
                                if (mmember.status === "selected") {
                                  mmembers.push(Object.assign(mmember, { status: "start" }));
                                  continue;
                                }
                                if (mmember.status === "none") {
                                  mmembers.push(Object.assign(mmember, { status: "select" }));
                                  continue;
                                }
                              }
                              mmembers.push(newMember);
                              if (mmembers[0].status === "select") mmembers[0].status = "start";
                              
                              const words = [...this.state.words, newMember];
                              if (words.length > 20) words.shift();

                              this.setState({members: mmembers, words, load: true, ment: undefined, status: "playing"});
                            }, 800);
                          });
                        }, 800);
                      });
                    }
                  }
                }}
                key={mmember.id}
                />
            ))}
          </Cards>
        </Screen>
      </>}
    </>);
  }
}
