const { modelManager, stringManager } = require('../../helpers');
const { AdminModel } = require('./model');
const { WFClient } = require('witty-flow-sms');
const _ = require('lodash');

// Create An Instance Of The Class You Imported And Pass The App ID And App Secret
const wittySmsClient = new WFClient(process.env.SMS_APP_ID, process.env.SMS_APP_SECRET);

async function exportAdmins({ input }) {
  try {
    let __args;
    if (input) {
      if (input.filter) {
        let { search, dateRange, order, orderBy, ...filter } = input.filter;
        if (search) __args.search = search;
        if (dateRange) __args.dateRange = dateRange;
        if (order) __args.order = order;
        if (orderBy) __args.orderBy = orderBy;
        __args.filter = filter;
      }
      if (input.format) __args.format = input.format;
      if (input.fields) __args.fields = input.fields;
    }
    let __document = await modelManager.generateDocument({
      model: AdminModel,
      ...__args,
    });
    return __document;
  } catch (err) {
    return err;
  }
}

async function getAdmins({ filter: { search, dateRange, order, orderBy, ...filter }, pagination }) {
  try {
    let __admins = await modelManager.getDocuments({
      model: AdminModel,
      search,
      dateRange,
      filter: { ...filter, isDeleted: false },
      order,
      orderBy,
      searchFields: ['name', 'email', 'phone'],
      pagination,
      populate: 'createdBy',
    });
    return __admins;
  } catch (err) {
    return err;
  }
}

async function getAdminsLength({ filter: { search, dateRange, order, orderBy, ...filter } }) {
  try {
    let __adminsLength = await modelManager.countDocuments({
      model: AdminModel,
      search,
      dateRange,
      filter: { ...filter, isDeleted: false },
      searchFields: ['name', 'email', 'phone'],
    });
    return __adminsLength;
  } catch (err) {
    return err;
  }
}

async function getAdmin({ filter: { adminId } }) {
  try {
    let __admin = await AdminModel.findById(adminId).populate('createdBy').execPopulate();
    return __admin;
  } catch (err) {
    return err;
  }
}

const manipulatePhone = (phone) => _.chain(phone).slice(-9).join('').padStart(12, '233').value();

async function createAdmin({ input }, adminId) {
  try {
    let __admin = await AdminModel.findOne({ email: input.email });
    let genPass = stringManager.generateRandString(10);

    if (__admin) {
      //if we have an admin and he his deleted, just revive it and send whatever notificaiton you wanaa send
      if (__admin.isDeleted) {
        __admin.isDeleted = false;
        __admin.password = genPass;
        __admin.name = input.name;
        __admin.phone = manipulatePhone(input.phone);
        await __admin.save();

        //send sms of new password
        try {
          wittySmsClient.sendSms(
            process.env.SMS_SENDERNAME,
            input.phone,
            `Welcome to Rent-A-Ride. Your email is ${__admin.email} and your password is ${genPass}`,
          );
        } catch (error) {
          throw error;
        }
        return __admin;
      } else {
        return new Error('Admin already exists');
      }
    }
    console.log(genPass);
    let __newAdmin = new AdminModel({
      ...input,
      password: genPass,
      createdBy: adminId,
    });
    try {
      await __newAdmin.save();
    } catch (error) {
      return err;
    }

    //send sms of new password
    try {
      await wittySmsClient.sendSms(
        process.env.SMS_SENDERNAME,
        input.phone,
        `Welcome to Rent-A-Ride. Your email is ${__newAdmin.email} and your password is ${genPass}`,
      );
    } catch (error) {
      throw error;
    }
    return __newAdmin;
  } catch (err) {
    return err;
  }
}

async function updateAdmin({ input: { adminId, block, role } }, loggedInAdmin) {
  try {
    let __admin = await AdminModel.findById(adminId);
    if (!__admin) throw new Error('Admin not found');
    if (block === true) {
      __admin.blocked = {
        by: loggedInAdmin,
        at: new Date(),
      };
    } else {
      __admin.blocked = undefined;
    }
    return await __admin.save();
  } catch (err) {
    return err;
  }
}

async function deleteAdmin({ input: { adminId } }) {
  try {
    let __admin = await AdminModel.findById(adminId);
    if (!__admin) throw new Error('Admin not found');
    await AdminModel.findByIdAndUpdate(adminId, { isDeleted: true }, { new: true });
    return true;
  } catch (err) {
    return err;
  }
}

async function loginAdmin({ input: { email, password } }) {
  try {
    let __admin = await AdminModel.findOne({ email: email });
    if (!__admin) throw new Error('Admin not found');

    let __isValid = await __admin.comparePasswords(password);
    if (!__isValid) throw new Error('Incorrect password');
    return {
      admin: __admin,
      token: await __admin.generateAuthToken(),
    };
  } catch (err) {
    return err;
  }
}

async function updatePassword({ input: { oldPassword, newPassword } }, adminId) {
  try {
    let __admin = await AdminModel.findById(adminId);
    if (!__admin) throw new Error('Admin not found');
    let __isValid = await __admin.comparePasswords(oldPassword);
    if (!__isValid) throw new Error('Your current password is incorrect');
    __admin.password = newPassword;
    await __admin.save();
    return true;
  } catch (error) {
    return error;
  }
}

async function sendCode({ input: { email } }) {
  try {
    let __admin = await AdminModel.findOne({ email });
    if (!__admin) throw new Error('Admin not found');
    let genCode = stringManager.generateCode();
    __admin.password = genCode;
    await __admin.save();

    //send sms of new password
    try {
      await wittySmsClient.sendSms(
        process.env.SMS_SENDERNAME,
        `0${__admin.phone.slice(-9)}`,
        `Your reset password code is ${genCode}`,
      );
    } catch (error) {
      return error;
    }
    return __admin;
  } catch (error) {
    return error;
  }
}

async function resendCode({ input: { adminId } }) {
  try {
    let __admin = await AdminModel.findById(adminId);
    if (!__admin) throw new Error('Admin not found');
    let genCode = stringManager.generateCode();
    __admin.password = genCode;
    await __admin.save();

    //send sms of new password
    try {
      await wittySmsClient.sendSms(
        process.env.SMS_SENDERNAME,
        `0${__admin.phone.slice(-9)}`,
        `Your reset password code is ${genCode}`,
      );
    } catch (error) {
      return error;
    }
    return __admin;
  } catch (error) {
    return error;
  }
}

async function resetAdminPassword({ input: { adminId, code, password } }) {
  try {
    let __admin = await AdminModel.findById(adminId);
    if (!__admin) throw new Error('Admin not found');
    let __isValid = await __admin.comparePasswords(code);
    if (!__isValid) throw new Error('Reset code is incorrect');
    __admin.password = password;
    await __admin.save();
    return true;
  } catch (error) {
    return error;
  }
}

module.exports = {
  getAdmin,
  getAdmins,
  getAdminsLength,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
  exportAdmins,
  updatePassword,
  sendCode,
  resendCode,
  resetAdminPassword,
};
