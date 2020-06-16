import * as React from "react";
import { ReactPluginsContext } from "@decathlon/react-plugins-core";

export const PLUGIN_ID = "bar";

const Plugin = () => {
  const {
    actions: { unsubscribePlugin }
  } = React.useContext(ReactPluginsContext);
  return (
    <div className="plugin">
      <div>
        <b>Custom plugin Plugin</b>: is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem
        Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </div>
      <button type="button" onClick={() => unsubscribePlugin(PLUGIN_ID)}>
        Fermer
      </button>
    </div>
  );
};

export default Plugin;
