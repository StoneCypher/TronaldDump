// Type definitions for react-native-tab-view
// Project: https://github.com/react-native-community/react-native-tab-view
// Definitions by: Kyle Roach <https://github.com/iRoachie>
// TypeScript Version: 2.3.3

declare module 'react-native-tab-view' {
  import React from 'react'
  import { ViewProperties, TextStyle, ViewStyle, StyleSheetProperties } from 'react-native'

  interface SceneMapStatic {
    [key: string]: any
  }

  interface TabViewAnimatedProps extends ViewProperties {
    navigationState: any
    swipeEnabled?: boolean
    renderScene: SceneMapStatic
    renderHeader(props: any): JSX.Element
    onRequestChangeTab(index: number): void
  }

  interface TabBarProps {
    labelStyle: TextStyle
    indicatorStyle: ViewStyle
    scrollEnabled?: boolean
    renderBadge?(scene: any): JSX.Element
    renderLabel?(scene: any): JSX.Element
    style: StyleSheetProperties
  }

  export function SceneMap(map: SceneMapStatic): SceneMapStatic

  export class TabViewAnimated extends React.Component<TabViewAnimatedProps, any> { }
  export class TabBar extends React.Component<TabBarProps, any> { }
}
