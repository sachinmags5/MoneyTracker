import * as service from "./user.service.js";

export const register = async (req, res) => {
  const user = await service.registerUser(req.body);
  res.status(201).json(user);
};
