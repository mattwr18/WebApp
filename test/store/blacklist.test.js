import test from 'ava'
import { mutations, actions } from '../../store/blacklist.js'
const feathers = require('@feathersjs/feathers');


const { usersettings } = mutations;
const { blacklist, unblacklist } = actions;

test('usersettings setter', t => {
  const state = { usersettings: { blacklist: [] } }
  usersettings(state, { blacklist: [1] } );
  t.deepEqual(state.usersettings, { blacklist: [1] });
});

/**
 * SOURCE: https://vuex.vuejs.org/guide/testing.html 
 */
const testAction = async (action, payload, state, expectedMutations, testrunner) => {
  let count = 0
  // mock commit
  const commit = (type, payload) => {
    const mutation = expectedMutations[count]
    try {
      testrunner.deepEqual(type, mutation.type)
      if (payload) {
        testrunner.deepEqual(payload, mutation.payload)
      }
    } catch (error) {
      testrunner.fail(new Error(error))
    }
    count++
    if (count >= expectedMutations.length) {
      testrunner.pass()
    }
  }
  // call the action with mocked store and arguments
  await action({ commit, state }, payload)
  // check if no mutations should have been dispatched
  if (expectedMutations.length === 0) {
    testrunner.deepEqual(count, 0)
    testrunner.pass()
  }
}

test('blacklist stores blacklist', async (t) => {
  t.plan(4); // 3 in testAction + api request;
  let api = feathers();
  api.use('/usersettings', {
    async create(data) {
      t.pass();
    }
  });

  const state = { usersettings: { blacklist: [] } }
  let actionUnderTest = actions.blacklist.bind({app: {$api: api}});
  await testAction(actionUnderTest, 42, state, [
    { type: 'usersettings', payload: { blacklist: [42] } }
  ], t)
});
