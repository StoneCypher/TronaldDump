declare module 'react-native-toolbar-component' {
  import * as React from 'react';

  export type ToolbarLayout = 'default' | 'icon' | 'title';

  export interface ToolbarItem {
    title?: string;
    icon?: number;
    layout?: ToolbarLayout;
    onPress?: () => void;
  }

  export type ToolbarForground = 'dark' | 'light';

  export interface ToolbarComponentProps {
    style?: any;
    forground?: ToolbarForground;
    title?: string;
    leftItem?: ToolbarItem;
    rightItem?: ToolbarItem;
  }

  export default class ToolbarComponent extends React.Component<ToolbarComponentProps, {}> {
  }
}