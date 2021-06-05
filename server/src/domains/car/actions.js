const { modelManager } = require('../../helpers');
const { CarModel } = require('./model');

//get all cars based on a filter
async function getCars({ filter: { search, dateRange, order, orderBy, ...filter }, pagination }) {
  try {
    let __cars = await modelManager.getDocuments({
      model: CarModel,
      search,
      dateRange,
      filter: { ...filter, isDeleted: false },
      order,
      orderBy,
      searchFields: ['make', 'model', 'description'],
      pagination,
      populate: '',
    });
    return __cars;
  } catch (err) {
    throw err;
  }
}

//get all cars length based on a filter
async function getCarsLength({ filter: { search, dateRange, order, orderBy, ...filter } }) {
  try {
    let __carsLength = await modelManager.countDocuments({
      model: CarModel,
      search,
      dateRange,
      filter: { ...filter, isDeleted: false },
      searchFields: ['make', 'model', 'description'],
    });
    return __carsLength;
  } catch (err) {
    throw err;
  }
}

// get a car based on an id
async function getCar({ filter: { carId } }) {
  try {
    let __car = await CarModel.findById(carId);
    return __car;
  } catch (err) {
    throw err;
  }
}

// create new car
async function createCar({ input }, adminId) {
  try {
    let __newCar = new CarModel({
      ...input,
      createdBy: adminId,
    });
    try {
      await __newCar.save();
    } catch (error) {
      return error;
    }
    return __newCar;
  } catch (err) {
    return err;
  }
}

//update car
async function updateCar({ input }) {
  try {
    let __car = await CarModel.findById(input.carId);
    if (!__car) throw new Error('Car not found');
    await CarModel.findByIdAndUpdate(input.carId, { ...input }, { new: true });
    return __car;
  } catch (err) {
    return err;
  }
}

async function deleteCar({ input: { carId } }) {
  try {
    let __car = await CarModel.findById(carId);
    if (!__car) throw new Error('Car not found');
    await CarModel.findByIdAndUpdate(carId, { isDeleted: true }, { new: true });
    return true;
  } catch (err) {
    return err;
  }
}

module.exports = {
  getCar,
  getCars,
  getCarsLength,
  createCar,
  updateCar,
  deleteCar,
};
