const { AdminModel } = require('../admin/model');
const { UserModel } = require('../user/model');
const { CarModel } = require('../car/model');
const { RentalModel } = require('../rental/model');

const getStatistics = async () => {
  try {
    let users = await UserModel.countDocuments({
      isDeleted: false,
    });
    let administrators = await AdminModel.countDocuments({
      isDeleted: false,
    });

    let cars = await CarModel.countDocuments({
      isDeleted: false,
    });
    let availableCars = await CarModel.countDocuments({
      isDeleted: false,
      status: 'Available',
    });
    let rentedOutCars = cars - availableCars;
    let rentals = await RentalModel.countDocuments({
      isDeleted: false,
    });
    let requestedRentals = await RentalModel.countDocuments({
      isDeleted: false,
      status: 'Requested',
    });
    let paidRentals = await RentalModel.countDocuments({
      isDeleted: false,
      status: 'Paid',
    });
    let acceptedRentals = await RentalModel.countDocuments({
      isDeleted: false,
      status: 'Accepted',
    });
    let pickedUpRentals = await RentalModel.countDocuments({
      isDeleted: false,
      status: 'PickedUp',
    });
    let droppedOffRentals = await RentalModel.countDocuments({
      isDeleted: false,
      status: 'DroppedOff',
    });
    let cancelledRentals = await RentalModel.countDocuments({
      isDeleted: false,
      status: 'Cancelled',
    });

    return {
      users,
      administrators,
      cars,
      availableCars,
      rentedOutCars,
      rentals,
      cancelledRentals,
      droppedOffRentals,
      pickedUpRentals,
      acceptedRentals,
      requestedRentals,
      paidRentals,
    };
  } catch (error) {
    return new Error(error);
  }
};

module.exports = {
  getStatistics,
};
