import * as React from 'react';
import { Text } from 'react-native';
import { Content } from './Content';

import * as renderer from 'react-test-renderer';

describe('layout/Content', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<Content />).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('renders without crashing with children', () => {
    const rendered = renderer.create(
      <Content>
        <Text>Hello, World</Text>
      </Content>
    ).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('can center children', () => {
    const rendered = renderer.create(
      <Content centered={true}>
        <Text>Hello, World</Text>
      </Content>
    ).toJSON();

    expect(rendered).toBeTruthy();
    expect(rendered).toHaveProperty('props.style.alignItems', 'center');
  });
});
