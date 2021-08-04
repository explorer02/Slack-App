const { UserController } = require("./user-controller");

exports.AuthController = class {
  constructor() {
    this.userController = new UserController();
  }
  async verifyLogin(id, password) {
    const user = await this.userController.getUser(id);
    console.log(user);
    if (user && user.password === password) return true;
    return false;
  }
};
