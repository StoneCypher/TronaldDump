import * as React from 'react';
import { Alert, Linking, Platform, Share, StyleSheet, Text, TouchableNativeFeedback, TouchableHighlight, View } from 'react-native';

import Toast from 'react-native-root-toast';

import { createTextStyle } from './Text';

import { addFavoriteAsync, removeFavoriteAsync, IQuote } from '../actions';

const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableHighlight;

export interface QuoteProps {
  body?: string;
  footer?: string;
  onPress?: () => void;
  onLongPress?: () => void;
}

export class Quote extends React.Component<QuoteProps, {}> {
  public static open = (quote: IQuote) => {
    Alert.alert(
      'Quote',
      'You got some options',
      [
        {
          text: 'Open Source', onPress: () => {
            if (quote.url) {
              Linking.openURL(quote.url);
            }
          }
        },
        {
          text: 'Share', onPress: () => {
            let message = `"${quote.body}"\n\n- Trump via ${quote.url}`;
            let url = quote.url;
            if (quote.image) {
              message = `${quote.image}\n\n- Trump via ${quote.url}"`;
              url = quote.image;
            }

            Share.share(
              {
                title: 'Tronald Dump Meme',
                message,
                url,
              },
              {
                dialogTitle: 'Tronald Dump',
              }
            );
          }
        },
        { text: 'Cancel', style: 'cancel', },
      ],
      { cancelable: true },
    );
  }

  public static addToFavorites = (quote?: IQuote) => {
    if (quote) {
      addFavoriteAsync(quote)
        .then(() => {
          Toast.show('Added to favorites');
        });
    }
  }

  public static removeFavorite = (quote?: IQuote): Promise<boolean> => {
    return new Promise((resolve) => {
      if (quote) {
        Alert.alert(
          'Remove from favorites',
          'Would you like to remove this 💩 from your favorites?',
          [
            {
              text: 'Yes', onPress: () => {
                removeFavoriteAsync(quote.key).then(() => {
                  resolve(true);
                });
              }
            },
            { text: 'No', style: 'cancel', onPress: () => resolve(false) },
          ],
          { cancelable: false },
        );
      }
      else {
        resolve(false);
      }
    })
  }

  public render(): JSX.Element {
    const { body, footer, onPress, onLongPress } = this.props;

    return (
      <Touchable onPress={onPress} onLongPress={onLongPress}>
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteBodyText}>{body}</Text>
          {
            footer && (
              <View style={styles.quoteFooterContainer}>
                <Text style={styles.quoteFooterText}>{footer}</Text>
              </View>
            )
          }
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  quoteContainer: {
    backgroundColor: '#f9f9f9',
    borderLeftColor: '#cccccc',
    borderLeftWidth: 10,
    padding: 10,
  },
  quoteFooterContainer: {
    marginTop: 10,
  },
  quoteBodyText: createTextStyle({
    fontSize: 16,
    lineHeight: 18,
    fontFamily: 'monospace',
  }),
  quoteFooterText: createTextStyle({
    fontFamily: 'monospace',
  })
})