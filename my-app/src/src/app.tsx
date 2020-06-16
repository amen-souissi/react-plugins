import * as React from "react";
import { ReactPluginsContext } from "@decathlon/react-plugins-core";

const Root = () => {
  return (
    <ReactPluginsContext.Consumer>
      {(props: any) => {
        console.log(props);

        //@ts-ignore
        return Object.values(props.plugins).map((plugin) => {
          //@ts-ignore
          const Plugin = plugin.component;
          return <Plugin />;
        });
      }}
    </ReactPluginsContext.Consumer>
  );
};

export default Root;
