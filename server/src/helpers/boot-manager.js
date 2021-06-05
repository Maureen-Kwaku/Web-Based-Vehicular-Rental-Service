const { AdminModel } = require('../domains/admin/model');

const setupDefaultConfiguration = async () => {
  try {
    let admins = await AdminModel.find();
    if (admins.length === 0) {
      console.log('Administrator not found, creating one');
      await new AdminModel({
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        phone: process.env.ADMIN_PHONE,
        password: process.env.ADMIN_PASSWORD,
      }).save();
    }
  } catch (error) {
    throw new Error(error);
  }

  console.log('Car Rental Service booted successfully');
};

const boot = async () => {
  await setupDefaultConfiguration();
};

module.exports = boot;
