import * as React from 'react';
import { StyleSheet, View } from 'react-native';

export interface ContentProps {
  centered?: boolean;
}

export class Content extends React.Component<ContentProps, {}> {
  public render(): JSX.Element {
    const { children, centered } = this.props;

    return (
      <View style={centered ? styles.contentCentered : styles.content}>
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 5,
  },
  contentCentered: {
    paddingHorizontal: 5,
    alignItems: 'center',
  }
})