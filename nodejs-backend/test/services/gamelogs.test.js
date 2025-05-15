const assert = require('assert');
const app = require('../../src/app');

describe('\'gamelogs\' service', () => {
  it('registered the service', () => {
    const service = app.service('gamelogs');

    assert.ok(service, 'Registered the service (gamelogs)');
  });
});
