import * as React from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text as NativeText, View } from 'react-native';

import { createTextStyle, Content, ListItem, Quote, Text, TextInput } from '../layout';
import { searchQuotesAsync, IQuote } from '../actions';

interface SearchPageState {
  query: string;
  isLoading: boolean;
  quotes?: Array<IQuote>;
  pageNumber: number;
  noMore: boolean;
  error?: string;
}

export class SearchPage extends React.Component<{}, SearchPageState> {
  state = {
    query: '',
    isLoading: false,
    quotes: [],
    pageNumber: 1,
    noMore: false,
    error: undefined,
  };

  _search = (reload: boolean) => {
    const { isLoading, query, quotes, pageNumber, noMore } = this.state;

    if (!isLoading && (reload || !noMore)) {
      const page = reload ? 1 : pageNumber + 1;

      this.setState({
        isLoading: true,
        pageNumber: page,
        quotes: reload ? [] : quotes,
        noMore: false,
        error: undefined,
      });

      searchQuotesAsync(query, page)
        .then((newQuotes: Array<IQuote>) => {
          if (newQuotes.length === 0) {
            this.setState({
              isLoading: false,
              noMore: true,
              error: reload && newQuotes.length === 0 ? `No results found for "${query}"` : undefined,
            })
          }
          else {
            if (reload) {
              this.setState({
                isLoading: false,
                noMore: false,
                error: undefined,
                quotes: newQuotes,
              })
            }
            else {
              this.setState({
                isLoading: false,
                noMore: false,
                error: undefined,
                quotes: [
                  ...quotes,
                  ...newQuotes,
                ],
              })
            }
          }
        })
    }
  }

  private _renderHeader = () => {
    return (
      <View>
        <Content centered={true}>
          <NativeText style={styles.poopEmoji}>💩</NativeText>
          <Text size="large">Search the dump</Text>
        </Content>
        <Content>
          <TextInput
            onChangeText={(text: string) => this.setState({ query: text })}
            returnKeyType="search"
            onSubmitEditing={() => {
              this._search(true);
            }}
          />

          <Button title="Search" onPress={() => this._search(true)} />
        </Content>
      </View>
    );
  }

  private _renderFooter = () => {
    const { isLoading, error, noMore, quotes } = this.state;

    return (
      <Content centered={true}>
        {
          isLoading && (
            <ActivityIndicator />
          )
        }
        {
          noMore && !isLoading && quotes.length > 0 && (
            <Text>No more resutls</Text>
          )
        }
        {
          error && (
            <NativeText style={styles.errorText}>{error}</NativeText>
          )
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
              <Content>
                <Quote
                  body={props.item.body}
                  footer={`- ${props.item.date}`}
                  onPress={() => Quote.open(props.item)}
                  onLongPress={() => Quote.addToFavorites(props.item)}
                />
              </Content>
            </View>
          );
        }}
      />
    );
  }

  public render(): JSX.Element {
    const { quotes } = this.state;

    return (
      <FlatList
        data={quotes}
        onEndReached={() => this._search(false)}
        ListHeaderComponent={this._renderHeader}
        ListFooterComponent={this._renderFooter}
        renderItem={this._renderItem}
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
  errorText: createTextStyle({
    color: 'red',
  }),
})