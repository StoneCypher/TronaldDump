import * as React from 'react';
import { Platform, StyleSheet, TextInput as NativeTextInput, TextInputProperties } from 'react-native';

import { palette } from '../theme';

export interface TextInputProps extends TextInputProperties {
  style?: undefined;
}

export class TextInput extends React.Component<TextInputProps, {}> {
  public render(): JSX.Element {
    const { children, ...rest } = this.props;

    return (
      <NativeTextInput {...rest} style={styles.textInput}>
        {children}
      </NativeTextInput>
    );
  }
}

const iosStyles = Platform.OS === 'android' ? {} : {
  borderWidth: 2,
  borderColor: palette.border,
  borderRadius: 15,
  paddingHorizontal: 10,
  height: 40,
  marginVertical: 5,
};

const styles = StyleSheet.create({
  textInput: {
    height: 60,
    fontSize: 20,
    ...iosStyles,
  },
})