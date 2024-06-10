import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { validate } from "../validation/validation.js";
import {
  loginUserValidation,
  registerUserValidation,
  getUserValidation,
  updateUserValidation,
} from "../validation/user-validation.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { request } from "express";
import jwt from "jsonwebtoken";

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "Username already exists");
  }

  user.password = await bcrypt.hash(user.password, 10);

  // Create token with jwt
  const token = jwt.sign(
    { userId: user.userId, role: "ADMIN" },
    process.env.SECRET_KEY,
    { expiresIn: "1d" } // Token expires in 1 day
  );

  user.token = token; // Add token to user object

  return prismaClient.user.create({
    data: user,
    select: {
      username: true,
      token: true,
    },
  });
};

const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      username: loginRequest.username,
    },
    select: {
      userId: true,
      username: true,
      password: true,
      role: true,
    },
  });

  if (!user) {
    throw new ResponseError(401, "Username or password wrong");
  }

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new ResponseError(401, "Username or password wrong");
  }

  const token = jwt.sign(
    { userId: user.userId, role: user.role },
    process.env.SECRET_KEY,
    { expiresIn: 86400 }
  );

  return prismaClient.user.update({
    data: {
      token: token,
    },
    where: {
      userId: user.userId,
    },
    select: {
      userId: true,
      username: true,
      role: true,
      token: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const get = async (req) => {
  const userRequest = validate(getUserValidation, req);

  const user = await prismaClient.user.findUnique({
    where: {
      userId: userRequest.userId,
    },
    select: {
      userId: true,
      username: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  return user;
};

const all = async (req) => {
  const userRequest = validate(getUserValidation, req);

  const user = await prismaClient.user.findMany();

  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  return user;
};

const update = async (id, data) => {
  const idReq = validate(getUserValidation, id);
  const dataReq = validate(updateUserValidation, data);

  const user = await prismaClient.user.findUnique({
    where: {
      userId: idReq.userId,
    },
    select: {
      userId: true,
      username: true,
      password: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  let a = {};
  if (dataReq.password) {
    const password = await bcrypt.hash(dataReq.password, 10);
    a = {
      username: dataReq.username,
      password: password,
    };
  } else {
    a = {
      username: dataReq.username,
      password: user.password,
    };
  }

  return prismaClient.user.update({
    where: {
      userId: user.userId,
    },
    data: a,
    select: {
      userId: true,
      username: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const logout = async (req) => {
  const userRequest = validate(getUserValidation, req);

  const user = await prismaClient.user.count({
    where: {
      userId: userRequest.userId,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  return prismaClient.user.update({
    where: {
      userId: userRequest.userId,
    },
    data: {
      token: null,
    },
    select: {
      userId: true,
      token: true,
    },
  });
};

export default {
  register,
  login,
  get,
  all,
  update,
  logout,
};
