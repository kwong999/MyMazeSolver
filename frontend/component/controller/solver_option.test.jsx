import React from 'react';
import renderer from 'react-test-renderer';
import SolverOption from './solver_option';

describe('SolverOption', () => {
  const component = renderer.create(
    <SolverOption
      movement={'All Direction'}
      solver={'A* Star'}
      changeSolver={jest.fn()}
      solverFull={jest.fn()}
      fullReset={jest.fn()}
      softReset={jest.fn()}
    />
  )
  test('should render without error', () => {
    let tree = component.toJSON();
    let componentInstance = component.root;
    expect(componentInstance.findByType('select').props.value).toBe('A* Star');
    let optionList = componentInstance.findAllByType('option');
    expect(optionList[0].props.value).toBe('A* Star');
    expect(optionList[1].props.value).toBe('Breadth First Search');
    expect(tree).toMatchSnapshot();
  })
})