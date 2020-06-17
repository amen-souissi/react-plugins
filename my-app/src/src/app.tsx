import * as React from "react";
import { ReactPluginsContext, IReactPluginsContext } from "@decathlon/react-plugins-core";

const Root = () => {
  return (
    <ReactPluginsContext.Consumer>
      {(props: IReactPluginsContext) => {
        return Object.values(props.plugins).map((plugin) => {
          const Plugin = plugin.component;
          return <Plugin />;
        });
      }}
    </ReactPluginsContext.Consumer>
  );
};

export default Root;
