const fs = require("fs").promises;

exports.readJSONFIle = async (path) => {
  try {
    const data = await fs.readFile(path, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("[readJSONFile]", error);
  }
  return false;
};

exports.writeJSONFIle = async (path, data) => {
  try {
    await fs.writeFile(path, JSON.stringify(data), { encoding: "utf8" });
    return true;
  } catch (error) {
    console.error("[writeJSONFile]", error);
  }
  return false;
};
