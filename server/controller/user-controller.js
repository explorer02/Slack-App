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
    if (!data) return;
    if (id in data) return { ...data[id], id };
  }
  async saveUser(user) {
    const data = await this.getAllUsers();
    if (!data) return false;
    const newUser = { ...user };
    data[user.id] = newUser;
    delete newUser.id;
    return await this.writeAllUsers(data);
  }
  async addChatRoom(members, room_id) {
    const data = await this.getAllUsers();
    if (!data) return false;
    members.forEach((member) => {
      const user = data[member];
      if (user) user.chat_rooms.push(room_id);
    });
    return await this.writeAllUsers(data);
  }
};
