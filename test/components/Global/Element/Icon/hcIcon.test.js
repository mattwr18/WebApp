import test from 'ava';
import { shallow } from 'vue-test-utils';
import Icon from '../../../../../components/Global/Elements/Icon/Icon';

test('It should render an `<i>`.', (t) => {
  const wrapper = shallow(Icon);

  t.true(wrapper.is('i'));
});
