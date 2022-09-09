type WaktaverseGroup = "isedol" | "gomem" | "ghost" | "woowakgood" | "waktaverse";

interface WaktaverseMember {
  id: string;
  nickname: string;
  imageUrl: string;
  group: WaktaverseGroup;
}

type Status = "start" | "select" | "selected" | "none";
type Member = WaktaverseMember & { status: Status; count?: number; };