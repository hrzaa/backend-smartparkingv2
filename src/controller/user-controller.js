import userService from "../service/user-service.js"

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await userService.get(req.params);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const all = async (req, res, next) => {
  try {
    const result = await userService.all();
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
 try {
   const data = req.body;
   const id = req.params;
   const result = await userService.update(id, data);
   res.status(200).json({
     data: result,
   });
 } catch (e) {
   next(e);
 }
}

const logout = async (req, res, next) => {
  try {
    const result = await userService.logout(req.params);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default{
    register,
    login, 
    get, 
    all,
    update,
    logout
}