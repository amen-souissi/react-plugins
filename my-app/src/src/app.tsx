import * as React from "react";
import { ReactPluginsContext, IReactPluginsContext } from "@decathlon/react-plugins-core";
import PluginCard from "./card";

interface IProps {
  appProps: any;
}

const Root = ({ appProps }: IProps) => {
  return (
    <ReactPluginsContext.Consumer>
      {({ plugins, actions: { unsubscribePlugin } }: IReactPluginsContext) => {
        return Object.values(plugins).map((plugin) => {
          const Plugin = plugin.component as React.ComponentType<any>;
          return (
            <PluginCard title={plugin.id} onClose={() => unsubscribePlugin(plugin.id)}>
              <Plugin appProps={appProps} />
            </PluginCard>
          );
        });
      }}
    </ReactPluginsContext.Consumer>
  );
};

export default Root;
