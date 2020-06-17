import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AppsIcon from "@material-ui/icons/Apps";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import TextField from "@material-ui/core/TextField";
import ReactPluginsProvider, { ReactPluginsContext } from "@decathlon/react-plugins-core";

import "./App.css";
import Root from "./src/app";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const App = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<(EventTarget & Element) | null>(null);
  const [text, setText] = React.useState<string>("");
  const open = Boolean(anchorEl);

  // @ts-ignore todo
  const updateText = (event) => {
    setText(event.target.value);
  };

  const handleMenu = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ReactPluginsProvider>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              React Plugins
            </Typography>

            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AppsIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <ReactPluginsContext.Consumer>
                  {({ plugins, actions: { unsubscribePlugin } }) => {
                    return Object.values(plugins).map((plugin) => {
                      return <MenuItem onClick={() => unsubscribePlugin(plugin.id)}>{plugin.id}</MenuItem>;
                    });
                  }}
                </ReactPluginsContext.Consumer>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <div className="App">
          <TextField
            id="outlined-basic"
            variant="outlined"
            onChange={updateText}
            placeholder="Text or tweet id"
          />
          <header className="App-container">
            <Root appProps={{ text }} />
          </header>
        </div>
      </div>
    </ReactPluginsProvider>
  );
};

export default App;
