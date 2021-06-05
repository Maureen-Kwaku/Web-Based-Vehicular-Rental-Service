const { authenticateAdmin } = require('../../middlewares');

const { deleteCar, updateCar, createCar, getCar, getCarsLength, getCars } = require('./actions');

module.exports = {
  Query: {
    cars: async function (_, args, context, info) {
      try {
        const result = await getCars(args);
        return result;
      } catch (err) {
        return err;
      }
    },
    carsLength: async function (_, args, context, info) {
      try {
        const result = await getCarsLength(args);
        return result;
      } catch (err) {
        return err;
      }
    },
    car: async function (_, args, context, info) {
      try {
        const result = await getCar(args);
        return result;
      } catch (err) {
        return err;
      }
    },
  },
  Mutation: {
    createCar: authenticateAdmin(async function (_, args, { user }, info) {
      try {
        const result = await createCar(args, user._id);
        return result;
      } catch (err) {
        return err;
      }
    }),
    updateCar: authenticateAdmin(async function (_, args, context, info) {
      try {
        const result = await updateCar(args);
        return result;
      } catch (err) {
        return err;
      }
    }),
    deleteCar: authenticateAdmin(async function (_, args, context, info) {
      try {
        const result = await deleteCar(args);
        return result;
      } catch (err) {
        return err;
      }
    }),
  },
};
