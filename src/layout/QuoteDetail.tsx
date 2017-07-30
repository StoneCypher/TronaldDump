import * as React from 'react';
import { WebView } from 'react-native';

export interface QuoteDetailProps {
  source: string;
}

export class QuoteDetail extends React.Component<QuoteDetailProps, {}> {
  public render(): JSX.Element {
    const { source } = this.props;

    return (
      <WebView source={{ uri: source }} />
    );
  }
}
