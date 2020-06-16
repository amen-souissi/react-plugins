import * as React from "react";
import { ReactPluginsContext } from "@decathlon/react-plugins-core";
//@ts-ignore
import { TwitterTweetEmbed } from "react-twitter-embed";

export const PLUGIN_ID = "foo";

const Plugin = () => {
  const {
    actions: { unsubscribePlugin }
  } = React.useContext(ReactPluginsContext);
  return (
    <div className="plugin">
      <TwitterTweetEmbed tweetId="1272952528188182529" />
      <button type="button" onClick={() => unsubscribePlugin(PLUGIN_ID)}>
        Fermer
      </button>
    </div>
  );
};

export default Plugin;
