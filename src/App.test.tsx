import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import Hero from "./components/Hero";

configure({ adapter: new Adapter() });

test('Pokemon name Filter responds to input', (done) => {
  const targettext = "pokemonname";

  const callback = (value) => {
    try {
      expect(value).toBe(targettext);
      done();
    } catch (error) {
      done(error);
    }
  };

  const element = shallow(<Hero nameFilter="test" setNameFilter={callback} />);

  element.find(".name-filter").simulate('change', {
    target: {
      value: targettext}});
});
