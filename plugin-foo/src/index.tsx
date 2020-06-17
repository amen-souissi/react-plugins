/* eslint-disable import/no-extraneous-dependencies */
import * as React from "react";
//@ts-ignore
import { TwitterTweetEmbed } from "react-twitter-embed";

export const PLUGIN_ID = "foo";

interface IProps {
  appProps: any;
}

const Plugin = ({ appProps: { text } }: IProps) => {
  const tweetId = text || "1272952528188182529";
  return <TwitterTweetEmbed key={tweetId} tweetId={tweetId} />;
};
export default Plugin;
