import * as actionTypes from "./actions-types";
import { Plugin, Plugins } from "./index";

export interface ISubscribePlugin {
  type: actionTypes.SUBSCRIBE_PLUGIN;
  plugin: Plugin;
}

export const subscribePlugin = (plugin: Plugin): ISubscribePlugin => ({
  type: actionTypes.SUBSCRIBE_PLUGIN,
  plugin
});

export interface IUnsubscribePlugin {
  type: actionTypes.UNSUBSCRIBE_PLUGIN;
  id: string;
}

export const unsubscribePlugin = (id: string): IUnsubscribePlugin => ({
  type: actionTypes.UNSUBSCRIBE_PLUGIN,
  id
});

export interface ISetPlugins {
  type: actionTypes.SET_PLUGINS;
  plugins: Plugins;
}

export const setPlugins = (plugins: Plugins): ISetPlugins => ({
  type: actionTypes.SET_PLUGINS,
  plugins
});

export type IReactPluginsAction = ISubscribePlugin | IUnsubscribePlugin | ISetPlugins;
