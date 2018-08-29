import test from 'ava';
import { shallow } from 'vue-test-utils';
import BlockButton from '../../../../../components/Global/Elements/BlockButton/BlockButton';

test('It should render an `<div>`.', (t) => {
  const wrapper = shallow(BlockButton);

  t.true(wrapper.is('div'));
});
