const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const roles = require("../common/roles/roles");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
    });

    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ "Error": "Please authenticate " });
  }
};

const authAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
    });

    if (!user) {
      throw new Error();
    }

    if(decoded.role !== roles.admin){
      return res.status(401).send({message: "You don't have permission"});
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ "Error": "Please authenticate " });
  }
};



module.exports = {
  auth, authAdmin
};
