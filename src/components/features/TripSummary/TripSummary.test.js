import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('should render correct link', () => {
    const expectedLinkId = 'abc';
    const expectedLink = '/trip/abc';
    const component = shallow(<TripSummary id={expectedLinkId} />);

    expect(component.find('.link').prop('to')).toEqual(expectedLink);
  });

  it('should render correct src and alt', () => {
    const expectedSrc = 'image.jpg';
    const expectedAlt = 'image';
    const component = shallow(<TripSummary image={expectedSrc} name={expectedAlt} />);

    expect(component.find('img').prop('src')).toEqual(expectedSrc);
    expect(component.find('img').prop('alt')).toEqual(expectedAlt);
  });

  it('should render correct title', () => {
    const expectedTitle = 'Lorem ipsum';
    const expectedCost = '1';
    const expectedDays = 2;
    const component = shallow(<TripSummary name={expectedTitle} cost={expectedCost} days={expectedDays} />);

    expect(component.find('.title').text()).toEqual(expectedTitle);
    expect(component.find('.details span').first().text('days')).toEqual(`${expectedDays} days`);
    expect(component.find('.details').childAt(1).text('cost')).toEqual(`from ${expectedCost}`);
  });
  /*
  it('should throw error without required props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });
*/
  it('sholud render spans of array', () => {
    const expectedTag1 = 'tag1';
    const expectedTag2 = 'tag2';
    const expectedTag3 = 'tag3';
    const component = shallow(<TripSummary tags={[expectedTag1,expectedTag2,expectedTag3]} />);

    expect(component.find('.tag').at(0).text()).toEqual(expectedTag1);
    expect(component.find('.tag').at(1).text()).toEqual(expectedTag2);
    expect(component.find('.tag').at(2).text()).toEqual(expectedTag3);
  });

  it ('sholud render if have tags props', () => {
    const component = shallow(<TripSummary />);

    expect(component.hasClass('tags')).toBe(false);
  });
});
