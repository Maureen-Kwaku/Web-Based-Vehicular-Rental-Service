const { modelManager } = require('../../helpers');
const { UserModel } = require('./model');

//get all users based on a filter
async function getUsers({ filter: { search, dateRange, order, orderBy, ...filter }, pagination }) {
  try {
    let __users = await modelManager.getDocuments({
      model: UserModel,
      search,
      dateRange,
      filter: { ...filter, isDeleted: false },
      order,
      orderBy,
      searchFields: ['name', 'email', 'phone', 'address'],
      pagination,
      populate: '',
    });
    return __users;
  } catch (err) {
    throw err;
  }
}

//get all users length based on a filter
async function getUsersLength({ filter: { search, dateRange, order, orderBy, ...filter } }) {
  try {
    let __usersLength = await modelManager.countDocuments({
      model: UserModel,
      search,
      dateRange,
      filter: { ...filter, isDeleted: false },
      searchFields: ['name', 'email', 'phone', 'address'],
    });
    return __usersLength;
  } catch (err) {
    throw err;
  }
}

// get a user based on an id
async function getUser({ filter: { userId } }) {
  try {
    let __user = await UserModel.findById(userId);
    return __user;
  } catch (err) {
    throw err;
  }
}

// create new User
async function createUser({ input }) {
  try {
    let __user = await UserModel.findOne({ email: input.email });

    if (__user) {
      return new Error('User already exists');
    }

    let __newUser = new UserModel({
      ...input,
    });
    try {
      await __newUser.save();
    } catch (error) {
      return error;
    }

    //log the person in
    return {
      user: __newUser,
      token: await __newUser.generateAuthToken(),
    };
  } catch (err) {
    return err;
  }
}

async function updateUser({ input: { userId } }) {
  try {
    let __user = await UserModel.findById(userId);
    if (!__user) throw new Error('User not found');
    return await __user.save();
  } catch (err) {
    return err;
  }
}

async function deleteUser({ input: { userId } }) {
  try {
    let __user = await UserModel.findById(userId);
    if (!__user) throw new Error('User not found');
    await UserModel.findByIdAndUpdate(userId, { isDeleted: true }, { new: true });
    return true;
  } catch (err) {
    return err;
  }
}

async function loginUser({ input: { email, password } }) {
  try {
    let __user = await UserModel.findOne({ email: email });
    if (!__user) throw new Error('User not found');

    let __isValid = await __user.comparePasswords(password);
    if (!__isValid) throw new Error('Incorrect password');
    return {
      user: __user,
      token: await __user.generateAuthToken(),
    };
  } catch (err) {
    return err;
  }
}

module.exports = {
  getUser,
  getUsers,
  getUsersLength,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  // exportUsers,
  // updatePassword,
  // sendCode,
  // resendCode,
  // resetUserPassword,
};
