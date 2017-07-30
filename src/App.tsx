import * as React from 'react';
import { Modal, Platform, StyleSheet, View } from 'react-native';

import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

import ToolbarComponent from 'react-native-toolbar-component';

import { palette } from './theme';
import { FavoritesPage, HomePage, InfoPage, MemesPage, SearchPage } from './pages';

interface AppState {
  infoVisible: boolean;
  index: number;
  routes: Array<any>;
}

export default class App extends React.Component<{}, AppState> {
  state = {
    infoVisible: false,
    index: 0,
    routes: [
      { key: 'home', title: 'Home' },
      { key: 'search', title: 'Search' },
      { key: 'favorites', title: 'Favorites' },
      { key: 'memes', title: 'Memes' },
    ],
  };

  _handleIndexChange = (index: number) => this.setState({ index });

  _renderScene = SceneMap({
    'home': HomePage,
    'search': SearchPage,
    'favorites': FavoritesPage,
    'memes': MemesPage,
  });

  _renderHeader = (props: any) => <TabBar {...props} scrollEnabled={true} />;

  public render() {
    const { infoVisible } = this.state;

    return (
      <View style={styles.container}>
        <ToolbarComponent
          style={styles.toolbar}
          forground="light"
          title="Tronald Dump"
          rightItem={{
            layout: 'icon',
            title: 'About',
            icon: require('./assets/images/information.png'),
            onPress: () => this.setState({ infoVisible: !infoVisible }),
          }}
        />
        <Modal
          animationType="fade"
          transparent={false}
          visible={infoVisible}
          onRequestClose={() => this.setState({ infoVisible: false })}
        >
          <InfoPage />
        </Modal>
        <TabViewAnimated
          style={styles.container}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onRequestChangeTab={this._handleIndexChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBarUnderlay: {
    height: Platform.OS === 'ios' ? 20 : 24,
    backgroundColor: palette.statusBar,
  },
  toolbar: {
    backgroundColor: palette.toolbar,
  },
});