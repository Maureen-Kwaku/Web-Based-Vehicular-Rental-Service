const domains = require('../src/domains');
const entities = require('./data/entity.json');

async function runMigration() {
  try {
    for (let i = 0; i < entities.length; i++) {
      await domains.entity.createEntity(entities[i]);
    }
  }
  catch (err) {
    console.log(err.message);
  }
};

module.exports = runMigration;