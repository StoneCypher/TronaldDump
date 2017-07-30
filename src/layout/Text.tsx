import * as React from 'react';
import { StyleSheet, Text as NativeText } from 'react-native';

import { palette } from '../theme';

export type TextType = 'small' | 'normal' | 'medium' | 'large' | 'xlarge';

export interface TextProps {
  size?: TextType;
}

export class Text extends React.Component<TextProps, {}> {
  public render(): JSX.Element {
    const { children, size } = this.props;

    const style = styles[size || 'normal'];

    return (
      <NativeText style={style}>
        {children}
      </NativeText>
    );
  }
}

export const createTextStyle = (style: any) => {
  return {
    color: palette.fontPrimary,
    fontSize: 14,
    ...style,
  };
};

const styles = StyleSheet.create({
  small: createTextStyle({
    fontSize: 12,
  }),
  normal: createTextStyle({}),
  medium: createTextStyle({
    fontSize: 16,
  }),
  large: createTextStyle({
    fontSize: 20,
  }),
  xlarge: createTextStyle({
    fontSize: 24,
  }),
  xxlarge: createTextStyle({
    fontSize: 34,
  }),
})