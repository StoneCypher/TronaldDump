import * as React from 'react';
import { FlatList, RefreshControl, Image, StyleSheet, Text as NativeText, TouchableOpacity, View } from 'react-native';

import { createTextStyle, Content, ListItem, Quote } from '../layout';
import { loadFavoritesAsync, IQuote } from '../actions';

interface FavoritesPageState {
  isLoading: boolean;
  quotes?: Array<IQuote>;
  error?: string;
}

export class FavoritesPage extends React.Component<{}, FavoritesPageState> {
  state = {
    isLoading: false,
    quotes: [],
    error: undefined,
  };

  public componentDidMount() {
    this._loadFavorites();
  }

  private _removeFavorite = (quote: IQuote) => {
    Quote.removeFavorite(quote).then((removed) => {
      if (removed) {
        this._loadFavorites();
      }
    })
  }

  private _loadFavorites = () => {
    const { isLoading } = this.state;

    if (!isLoading) {
      this.setState({
        isLoading: true,
        error: undefined,
      });

      loadFavoritesAsync()
        .then((quotes: Array<IQuote>) => {
          if (quotes.length === 0) {
            this.setState({
              isLoading: false,
              error: 'Press and hold on quotes to add them to your favs',
              quotes,
            })
          }
          else {
            this.setState({
              isLoading: false,
              error: undefined,
              quotes,
            })
          }
        })
    }
  }

  private _renderFooter = () => {
    const { error } = this.state;

    return (
      <Content centered={true}>
        {
          error && [
            <NativeText key="error" style={styles.errorText}>{error}</NativeText>,
            <NativeText key="hint" style={styles.errorText}>Try pulling to refresh</NativeText>
          ]
        }
      </Content>
    );
  }

  private _renderItem = (props: { item: IQuote }) => {
    return (
      <ListItem
        render={() => {
          return (
            <View style={styles.listItemStyle}>
              {
                props.item.image ? (
                  <TouchableOpacity
                    style={styles.meme}
                    onPress={() => Quote.open(props.item)}
                    onLongPress={() => this._removeFavorite(props.item)}
                  >
                    <Image
                      style={styles.meme}
                      resizeMode="contain"
                      source={{ uri: props.item.image }}
                    />
                  </TouchableOpacity>
                ) : (
                    <Content>
                      <Quote
                        body={props.item.body}
                        footer={`- ${props.item.date}`}
                        onPress={() => Quote.open(props.item)}
                        onLongPress={() => this._removeFavorite(props.item)}
                      />
                    </Content>
                  )
              }
            </View>
          );
        }}
      />
    );
  }

  public render(): JSX.Element {
    const { quotes, isLoading } = this.state;

    return (
      <FlatList
        data={quotes}
        ListFooterComponent={this._renderFooter}
        renderItem={this._renderItem}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={this._loadFavorites}
          />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  poopEmoji: {
    fontSize: 60
  },
  listItemStyle: {
    paddingVertical: 5,
  },
  meme: {
    alignSelf: 'stretch',
    aspectRatio: 1,
  },
  errorText: createTextStyle({
    color: 'red',
  }),
})