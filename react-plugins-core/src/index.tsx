import * as React from "react";

import reactPluginsReducer from "./reducers";
import { setPlugins, IReactPluginsAction, subscribePlugin, unsubscribePlugin } from "./actions";

let PLUGINS: Plugins = {};

const nop = () => null;

export interface Plugin {
  id: string;
  component: React.ComponentType<any>;
  // @todo add the state prop (is_active...)
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

export interface IReactPluginsProviderProps {
  children: JSX.Element;
}

const initialReactPluginContext: IReactPluginsContext = {
  plugins: {},
  actions: {
    setPlugins: nop,
    subscribePlugin: nop,
    unsubscribePlugin: nop
  }
};

export const ReactPluginsContext: React.Context<IReactPluginsContext> = React.createContext<IReactPluginsContext>(
  initialReactPluginContext
);

const ReactPluginsProvider = ({ children }: IReactPluginsProviderProps) => {
  const [state, dispatch] = React.useReducer(reactPluginsReducer, initialReactPluginContext);

  const actions = React.useMemo(() => mapDispatchToProps(dispatch), [dispatch]);

  React.useEffect(() => {
    actions.setPlugins(PLUGINS);
  }, [PLUGINS]);

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

/*
 Setup all plugins. The plugins are located in the node_modules/@decathlon/plugin_* folders.
 Each plugin has a setup.js file in the dist folder.
**/
function importAll(context: any) {
  context.keys().forEach(context);
}
// @ts-ignore
importAll(require.context("../../", true, /plugin-.*\/dist\/setup.js$/));
