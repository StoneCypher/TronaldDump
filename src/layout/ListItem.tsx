import * as React from 'react';
import { View } from 'react-native';

export interface ListItemProps {
  render: () => JSX.Element;
}

export class ListItem extends React.PureComponent<ListItemProps, {}> {
  public render(): JSX.Element {
    const { render } = this.props;

    return (
      <View>
        {render()}
      </View>
    );
  }
}
