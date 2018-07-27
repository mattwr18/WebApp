import test from 'ava'
import { mutations, actions } from '../../store/blacklist.js'

const { usersettings } = mutations;
const { blacklist, unblacklist } = actions;

test('usersettings setter', t => {
  const state = { usersettings: { blacklist: [] } }
  usersettings(state, { blacklist: [1] } );
  t.deepEqual(state.usersettings, { blacklist: [1] });
});

const testAction = (action, payload, state, expectedMutations, testrunner) => {
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
  action({ commit, state }, payload)

  // check if no mutations should have been dispatched
  if (expectedMutations.length === 0) {
    testrunner.deepEqual(count, 0)
    testrunner.pass()
  }
}

test('blacklist stores blacklist', t => {
  const state = { usersettings: { blacklist: [] } }
  testAction(actions.blacklist, 42, state, [
    { type: 'usersettings', payload: { blacklist: [42] } }
  ], t)
});
