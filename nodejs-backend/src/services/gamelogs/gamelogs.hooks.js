const { authenticate } = require('@feathersjs/authentication').hooks;
const { ObjectId } = require('mongodb');

const restrictNonAdminsToOwnGamelogs = async (context) => {
  const { user } = context.params;

  if (!user) return context;

  if (user.role !== 'Admin') {
    context.params.query.userId = new ObjectId(user._id); 
  }

  return context;
};

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [restrictNonAdminsToOwnGamelogs],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
