/* eslint-disable import/no-extraneous-dependencies */
import { setupPlugin } from "@decathlon/react-plugins-core";

import Plugin, { PLUGIN_ID } from ".";

setupPlugin({ id: PLUGIN_ID, component: Plugin });
