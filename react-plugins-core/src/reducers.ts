import { IReactPluginsAction } from "./actions";
import * as actionTypes from "./actions-types";
import { Plugins, IReactPluginsContext, Plugin } from ".";

export type IReactPluginsState = Pick<IReactPluginsContext, "plugins">;

export const initialState: IReactPluginsState = {
  plugins: {}
};

const reactPluginsReducer = (state: IReactPluginsState = initialState, action: IReactPluginsAction): IReactPluginsState => {
  switch (action.type) {
    case actionTypes.SUBSCRIBE_PLUGIN: {
      const newPlugin: Record<string, Plugin> = { [action.plugin.id]: action.plugin };
      return {
        ...state,
        plugins: { ...state.plugins, ...newPlugin }
      };
    }
    case actionTypes.UNSUBSCRIBE_PLUGIN: {
      const plugins: Plugins = { ...state.plugins };
      delete plugins[action.id];
      return {
        ...state,
        plugins
      };
    }
    case actionTypes.SET_PLUGINS: {
      const plugins: Plugins = { ...action.plugins };
      return {
        ...state,
        plugins
      };
    }
    default:
      return state;
  }
};

export default reactPluginsReducer;
