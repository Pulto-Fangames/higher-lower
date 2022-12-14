export default function (group: WaktaverseGroup): string {
  switch (group) {
    case "isedol":
      return "이세계 아이돌";
    case "gomem":
      return "고정멤버";
    case "ghost":
      return "고멤 망령";
    case "woowakgood":
      return "우왁굳";
    case "waktaverse":
      return "왁타버스";
    case "content":
      return "우왁굳 컨텐츠";
    case "music":
      return "음악"
    case "meme":
      return "밈"
    default:
      return ""
  }
}