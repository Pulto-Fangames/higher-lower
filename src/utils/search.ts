import axios from "axios";

export default async (query: string) => {
  return +(await axios(`https://search.bsiu6562.repl.co/search?q=${query.replace(/ /g, "+")}`)).data.message;
}