const { authenticateAdmin } = require('../../middlewares');
const { getStatistics } = require('./actions');

module.exports = {
  Query: {
    statistics: authenticateAdmin(async function (_, args, context, info) {
      try {
        const result = await getStatistics();
        return result;
      } catch (err) {
        return err;
      }
    }),
  },
};
