import * as React from "react";

import "./style/index.css";

const Component = React.lazy(() => import("./Component"));

export const PLUGIN_ID = "bar";

const Plugin = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Component />
    </React.Suspense>
  );
};

export default Plugin;
