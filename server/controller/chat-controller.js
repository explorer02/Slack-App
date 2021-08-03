const { readJSONFIle, writeJSONFIle } = require("./utils");

exports.ChatController = class {
  async getChatRoom(id) {
    const data = await readJSONFIle(
      __dirname + `/../storage/chat_rooms/${id}.json`
    );
    return data;
  }
  async createChatRoom(members, id) {
    if (members.length < 2) return 0;
    if (!id) {
      if (members.length > 2) return false;
      id = members.join("_");
    }
    let type;
    if (members.length == 2) {
      type = "duel";
    } else type = "channel";
    const chatRoom = { id, type, members, messages: [] };
    console.log(chatRoom);
    return (await writeJSONFIle(
      __dirname + `/../storage/chat_rooms/${id}.json`,
      chatRoom
    ))
      ? chatRoom
      : false;
  }
};
