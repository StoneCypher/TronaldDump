import * as React from 'react';
import { Button, Image, RefreshControl, ScrollView, StyleSheet, Text as NativeText, TouchableOpacity, View } from 'react-native';

import { getRandomMeme, IQuote } from '../actions';
import { createTextStyle, Content, Quote } from '../layout';

interface MemesPageState {
  isLoading: boolean;
  error?: string,
  quote?: IQuote;
}

const defaultQuote: IQuote = {};

export class MemesPage extends React.Component<{}, MemesPageState> {
  state = {
    isLoading: false,
    error: undefined,
    quote: defaultQuote,
  };

  private _loadMeme = () => {
    const { isLoading } = this.state;

    if (!isLoading) {
      this.setState({ isLoading: true });
      getRandomMeme()
        .then((quote) => {
          if (quote) {
            this.setState({ quote, isLoading: false, error: undefined });
          }
          else {
            this.setState({ isLoading: false, error: 'Failed to create meme, try again' });
          }
        })
        .catch(() => {
          this.setState({ isLoading: false, error: 'Failed to create meme, try again' });
        });
    }
  }

  public componentDidMount() {
    this._loadMeme();
  }

  public render(): JSX.Element {
    const { isLoading, quote, error } = this.state;

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={this._loadMeme}
          />
        }
      >
        <View style={styles.container}>
          <Content centered={true}>
            {
              error && [
                <NativeText key="error" style={styles.errorText}>{error}</NativeText>,
              ]
            }
          </Content>
          <TouchableOpacity
            style={styles.meme}
            onPress={() => Quote.open(quote)}
            onLongPress={() => Quote.addToFavorites(quote)}
          >
            <Image
              style={styles.meme}
              resizeMode="contain"
              source={{ uri: quote ? quote.image : '' }}
            />
          </TouchableOpacity>
          <View style={styles.button}>
            <Button
              title="New 💩"
              onPress={this._loadMeme}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  meme: {
    alignSelf: 'stretch',
    aspectRatio: 1,
  },
  button: {
    marginTop: 5,
  },
  errorText: createTextStyle({
    color: 'red',
  }),
});
