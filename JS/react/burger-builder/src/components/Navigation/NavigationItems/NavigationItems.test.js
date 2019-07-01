import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
  it('should render two <NavigationItem /> items when not authenticated', () => {
    const wrapper = shallow(<NavigationItems />);
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render three <NavigationItem /> items when authenticated', () => {
    const wrapper = shallow(<NavigationItems isAuth />);
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('should render a logout <NavigationItem /> when authenticated', () => {
    const wrapper = shallow(<NavigationItems isAuth />);
    expect(wrapper.contains(<NavigationItem link="/logout">Log Out</NavigationItem>)).toEqual(true);
  });
});
