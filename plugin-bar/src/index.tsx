import * as React from "react";

import "./style/index.css";

const Component = React.lazy(() => import("./Component"));

export const PLUGIN_ID = "bar";

interface IProps {
  appProps: any;
}

const Plugin = ({ appProps }: IProps) => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Component text={appProps.text} />
    </React.Suspense>
  );
};

export default Plugin;
