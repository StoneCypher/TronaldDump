import * as React from 'react';
import { Image, Linking, ScrollView, StyleSheet, Text, View } from 'react-native';

import { createTextStyle } from '../layout';

export class InfoPage extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image
            resizeMode="contain"
            source={require('../assets/images/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>
            Tronald Dump
            </Text>
          <Text style={styles.body}>
            An archive for the dumbest things Donald Trump has ever said, as well as a meme generator.
          </Text>
          
          <Text>{'\n'}</Text>
          
          <View style={styles.inline}>
            <Text style={styles.underline} onPress={() => Linking.openURL('https://docs.tronalddump.io/')}>
              API DOCUMENTATION
            </Text>
            <Text style={styles.underline} onPress={() => Linking.openURL('https://github.com/jacob-ebey/TronaldDump')}>
              CODE
            </Text>
            <Text style={styles.underline} onPress={() => Linking.openURL('mailto:jacob.ebey@live.com')}>
              CONTACT
            </Text>
          </View>

          <Text>{'\n'}</Text>

          <Text style={styles.subtitle}>
            Legal disclaimer
          </Text>
          <Text style={styles.body}>
            This app and its creator are not affiliated with Donald Trump or any affiliated corporation. All products, and brands mentioned in this app are the respective trademarks and copyrights of their owners.
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    margin: 10,
    width: 250,
    height: 250,
    aspectRatio: 1,
  },
  title: createTextStyle({
    fontFamily: 'monospace',
    fontSize: 20,
  }),
  subtitle: createTextStyle({
    fontFamily: 'monospace',
    fontSize: 16,
  }),
  body: createTextStyle({
    fontFamily: 'monospace',
  }),
  underline: createTextStyle({
    fontFamily: 'monospace',
    fontSize: 12,
    marginHorizontal: 5,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#000"
  }),
  inline: {
    flex: 1,
    flexDirection: 'row',
  },
});
