import axios from "axios";
import getGroup from "./get-group";

export default async (member: Member) => {
  let query = `${getGroup(member.group)} ${member.nickname}`;
  if (member.keyword !== undefined) {
    query = member.keyword;
  }
  return +(await axios(`https://search.bsiu6562.repl.co/search?q=${query.replace(/ /g, "+")}`)).data.message;
}