const assert = require('assert');
const app = require('../../src/app');

describe('\'packages\' service', () => {
  it('registered the service', () => {
    const service = app.service('packages');

    assert.ok(service, 'Registered the service (packages)');
  });
});
