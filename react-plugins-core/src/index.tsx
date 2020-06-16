import * as React from "react";

import reactPluginsReducer from "./reducers";
import { setPlugins, IReactPluginsAction, subscribePlugin, unsubscribePlugin } from "./actions";

let PLUGINS: Plugins = {};

const nop = () => null;

export interface Plugin {
  id: string;
  component: React.ComponentType;
}

export type Plugins = Record<string, Plugin>;

export interface IPluginsActions {
  setPlugins: (plugins: Record<string, Plugin>) => void;
  subscribePlugin: (plugin: Plugin) => void;
  unsubscribePlugin: (id: string) => void;
}

export interface IReactPluginsContext {
  plugins: Plugins;
  actions: IPluginsActions;
}

export const ReactPluginsContext: React.Context<IReactPluginsContext> = React.createContext<IReactPluginsContext>({
  plugins: {},
  actions: {
    setPlugins: nop,
    subscribePlugin: nop,
    unsubscribePlugin: nop
  }
});

export interface IReactPluginsProviderProps {
  children: JSX.Element;
}

const ReactPluginsProvider = ({ children }: IReactPluginsProviderProps) => {
  const [state, dispatch] = React.useReducer(reactPluginsReducer, {
    plugins: {}
  });

  React.useEffect(() => {
    dispatch(setPlugins(PLUGINS));
  }, [PLUGINS]);

  const actions = React.useMemo(() => mapDispatchToProps(dispatch), [dispatch]);
  return <ReactPluginsContext.Provider value={{ ...state, actions }}>{children}</ReactPluginsContext.Provider>;
};

const mapDispatchToProps = (dispatch: React.Dispatch<IReactPluginsAction>) => ({
  setPlugins: (plugins: Plugins) => dispatch(setPlugins(plugins)),
  subscribePlugin: (plugin: Plugin) => dispatch(subscribePlugin(plugin)),
  unsubscribePlugin: (id: string) => dispatch(unsubscribePlugin(id))
});

export const setupPlugin = (plugin: Plugin) => {
  PLUGINS = { ...PLUGINS, [plugin.id]: plugin };
};

export default ReactPluginsProvider;
export { default as reactPluginsReducer } from "./reducers";
export * from "./reducers";

function importAll(context: any) {
  context.keys().forEach(context);
}

// @ts-ignore
importAll(require.context("../../", true, /plugin-.*\/dist\/setup.js$/));
