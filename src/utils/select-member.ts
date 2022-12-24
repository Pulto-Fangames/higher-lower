import waktaverse from "./res/waktaverse";

export default (status: Status, members?: Member[]): Member => {
  const $select = () => {
    const member = waktaverse[Math.floor(Math.random() * waktaverse.length)];
    return { ...member, status, count: 0 };
  }
  let one = $select();

  if (members) {
    while (members.find(m => m.id === one.id)) {
      one = $select();
    }
  }

  return one;
}
