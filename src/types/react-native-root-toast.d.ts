declare module 'react-native-root-toast' {
  import * as React from 'react';

  export default class Toast extends React.Component<{}, {}> {
    static show: (message: string) => void;
  }
}