import * as React from 'react';
import { Image, RefreshControl, StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';

import { Content, Quote, Text } from '../layout';
import { getRandomQuoteAsync, IQuote } from '../actions';

export interface HomePageState {
  isLoading: boolean;
  quote: IQuote;
}

const initialQuote: IQuote = {};

export class HomePage extends React.Component<{}, HomePageState> {
  state = {
    isLoading: false,
    quote: initialQuote,
  }

  _loadQuote = () => {
    const { isLoading } = this.state;

    if (!isLoading) {
      this.setState({
        isLoading: true,
        quote: initialQuote,
      });
      getRandomQuoteAsync()
        .then((quote: IQuote) => {
          this.setState({
            isLoading: false,
            quote,
          })
        });
    }
  }

  public componentDidMount() {
    this._loadQuote();
  }

  public render(): JSX.Element {
    const { isLoading, quote } = this.state;

    return (
      <ScrollView style={styles.container} refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={this._loadQuote}
        />
      }>
        <Content centered={true}>
          <TouchableOpacity onPress={this._loadQuote}>
            <Image
              resizeMode="contain"
              source={require('../assets/images/logo.png')}
              style={styles.logo}
            />
          </TouchableOpacity>
          <Text size="medium">
            What Tronald thinks about
          </Text>
        </Content>
        <View style={styles.body}>
          {
            (!isLoading && quote) && (
              <Content>
                <Quote
                  body={quote.body}
                  footer={`- ${quote.date}`}
                  onPress={() => Quote.open(quote)}
                  onLongPress={() => Quote.addToFavorites(quote)}
                />
              </Content>
            )
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    marginTop: 10,
  },
  logo: {
    margin: 10,
    width: 250,
    height: 250,
    aspectRatio: 1,
  },
});
