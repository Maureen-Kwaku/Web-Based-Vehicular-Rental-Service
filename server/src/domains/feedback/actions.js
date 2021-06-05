const { modelManager } = require('../../helpers');
const { FeedBackModel } = require('./model');

//get all feedback based on a filter
async function getFeedBacks({
  filter: { search, dateRange, order, orderBy, ...filter },
  pagination,
}) {
  try {
    let __feedbacks = await modelManager.getDocuments({
      model: FeedBackModel,
      search,
      dateRange,
      filter: { ...filter },
      order,
      orderBy,
      searchFields: ['name', 'email', 'message'],
      pagination,
      populate: '',
    });
    return __feedbacks;
  } catch (err) {
    throw err;
  }
}

// create new feedback
async function createFeedBack({ input }) {
  try {
    let __newFeedback = new FeedBackModel({
      ...input,
    });
    try {
      await __newFeedback.save();
    } catch (error) {
      return error;
    }
    return __newFeedback;
  } catch (err) {
    return err;
  }
}

module.exports = {
  getFeedBacks,
  createFeedBack,
};
