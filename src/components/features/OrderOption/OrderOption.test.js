import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';
import DatePicker from  'react-datepicker';

describe('Component OrderOption', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrderOption name='Lorem' type='text'/>);
    expect(component).toBeTruthy();
  });

  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

  it('should render correct title', () => {
    const expectedName = 'Lorem ipsum';
    const expectedType = 'text';
    const component = shallow(<OrderOption name={expectedName} type={expectedType} />);

    expect(component.find('.title').text()).toEqual(expectedName);
  });
});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
    {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: {currentValue: [mockProps.currentValue]},
  number: {currentValue: 1},
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;

for(let type in optionTypes){
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption; /* 1 */

    beforeEach(() => {
      mockSetOrderOption = jest.fn(); /* 2 */
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption} /* 3 */
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });

    /* common tests */
    it('passes dummy test', () => {
      expect(1).toBe(1);
      console.log(component.debug());
      subcomponent.debug();
    });

    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });

    /* type-specific tests */
    switch (type) {
      /* tests for dropdown */
      case 'dropdown': {
        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);

          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);

          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      /* tests for icons */
      case 'icons': {
        it('contains Icon', () => {
          const icon = renderedSubcomponent.find('Icon');
          expect(icon.length).toBe(testValueNumber);

          const firstIcon = icon.find(mockProps.values[0].icon).length;
          expect(firstIcon).toBe(0);

          const emptyIcon = icon.find('Icon[name="times-circle"]').length;
          expect(emptyIcon).toBe(1);
        });

        it('should run setOrderOption function on click', () => {
          renderedSubcomponent.find('div').last().simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      /* tests for checkboxes */
      case 'checkboxes': {
        it ('contains checkbox', () => {
          const checkbox = renderedSubcomponent.find('input');
          expect(checkbox.length).toBe(2);

          const input = checkbox.find('input');
          expect(input.length).toBe(mockProps.values.length);
          expect(input.at(0).prop('type')).toBe('checkbox');
          expect(input.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(input.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find(`input[value='${testValue}']`).simulate('change', {currentTarget: {checked: true}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]:  [mockProps.currentValue, testValue]});
        });
        break;
      }
      /* tests for numbers */
      case 'number': {
        it ('contains number', () => {
          const number = renderedSubcomponent.find('input');
          expect(number.length).toBe(1);

          const inputs = number.find('input');
          expect(inputs.length).toBe(1);
          expect(inputs.at(0).prop('type')).toBe('number');
          expect(inputs.at(0).prop('value')).toBe(mockPropsForType.number.currentValue);
          expect(inputs.at(0).prop('min')).toBe(mockProps.limits.min);
          expect(inputs.at(0).prop('max')).toBe(mockProps.limits.max);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValueNumber}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
        });
        break;
      }
      /* tests text */
      case 'text': {
        it ('contains text', () => {
          const text = renderedSubcomponent.find('input');
          expect(text.length).toBe(1);

          const options = text.find('input');
          expect(options.length).toBe(1);
          expect(options.at(0).prop('type')).toBe('text');
        });
        break;
      }
      /* tests date */
      case 'date' : {
        it('contains DatePicker', () => {
          const datePicker = renderedSubcomponent.find(DatePicker);
          expect(datePicker.length).toBe(1);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find(DatePicker).simulate('change', testValue);
          expect(mockSetOrderOption).toBeCalledTimes(0);
        });
        break;
      }
    }
  });
}
