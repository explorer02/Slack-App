const { readJSONFIle, writeJSONFIle } = require("./utils");

exports.UserController = class {
  async getAllUsers() {
    return await readJSONFIle(__dirname + "/../storage/Users.json");
  }
  async getUser(id) {
    const data = await this.getAllUsers();
    const user = data.find((user) => user.id === id);
    return user;
  }
  async saveUser(user) {
    const data = await this.getAllUsers();
    const newUser = { ...user, lastOnline: 0, chat_rooms: [] };
    data.push(newUser);
    return await writeJSONFIle(__dirname + "/../storage/Users.json", data);
  }
};
