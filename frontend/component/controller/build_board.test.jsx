import React from 'react';
import renderer from 'react-test-renderer';
import BuildBoard from './build_board';

describe('BuildBoard', () => {
  const component = renderer.create(
    <BuildBoard
      dimensionRow={'9'}
      dimensionCol={'10'}
      handleChange={str => jest.fn()}
      handleBuildBoard={jest.fn()}
    />
  )
  test('should render without error', () => {
    let tree = component.toJSON();
    let componentInstance = component.root;
    let input = componentInstance.findAllByType('input');
    expect(input[0].props.value).toBe('9');
    expect(input[1].props.value).toBe('10');
    expect(tree).toMatchSnapshot();    
  })
})