exports.extractFields = (obj, fields) => {
  return fields.reduce((acc, field) => {
    acc[field] = obj[field];
    return acc;
  }, {});
};

exports.checkFields = (obj, fields) => {
  return fields.every((f) => obj[f]);
};

exports.sendResponse = {
  resourceNotFound: (res, resource) => {
    res.status(404).json({ message: `${resource} not found!` });
  },
  unauthorized: (res) => {
    res
      .status(401)
      .json({ message: "You are not authorized for this resource." });
  },
  forbidden: (res) => {
    res.status(403).json({ message: "You are Forbidden to this resource." });
  },
  badRequest: (res, message, data = {}) => {
    res.status(400).json({ message, ...data });
  },

  unknownError: (res) => {
    res.status(500).json({ message: "Unknown Error!!" });
  },

  success: (res, message = "Success!", data = {}) => {
    res.status(200).json({ message, ...data });
  },
};
