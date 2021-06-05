const { createFeedBack, getFeedBacks } = require('./actions');

module.exports = {
  Query: {
    feedBacks: async function (_, args, context, info) {
      try {
        const result = await getFeedBacks(args);
        return result;
      } catch (err) {
        return err;
      }
    },
  },
  Mutation: {
    createFeedBack: async function (_, args, context, info) {
      try {
        const result = await createFeedBack(args);
        return result;
      } catch (err) {
        return err;
      }
    },
  },
};
