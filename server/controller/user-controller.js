const { readJSONFIle, writeJSONFIle } = require("./utils");

exports.UserController = class {
  async getAllUsers() {
    return await readJSONFIle(__dirname + "/../storage/Users.json");
  }
  async writeAllUsers(data) {
    return await writeJSONFIle(__dirname + "/../storage/Users.json", data);
  }

  async getUser(id) {
    const data = await this.getAllUsers();
    if (!data) return false;
    const user = data.find((user) => user.id === id);
    return user;
  }
  async saveUser(user) {
    const data = await this.getAllUsers();
    if (!data) return false;
    const newUser = { ...user, lastOnline: 0, chat_rooms: [] };
    data.push(newUser);
    return await this.writeAllUsers(data);
  }
  async addChatRoom(members, room_id) {
    const data = await this.getAllUsers();
    if (!data) return false;
    members.forEach((member) => {
      const user = data.find((user) => user.id === member);
      user.chat_rooms.push(room_id);
    });
    return await this.writeAllUsers(data);
  }
};
