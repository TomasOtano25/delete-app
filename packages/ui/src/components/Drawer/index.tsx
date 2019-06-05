import * as React from "react";
import Drawer from "@material-ui/core/Drawer";
import classNames from "classnames";
import {
  withStyles,
  WithStyles,
  Theme,
  ListItemIcon,
  StyleRulesCallback,
  WithTheme
} from "@material-ui/core";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/Inbox";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Router } from "./Router";

const DrawerToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 8px;
`;

export const StyledListItem = styled(({ ...other }: ListItemProps) => (
  <ListItem {...other} />
))`
  && {
    border-radius: 0 40px 40px 0;
    margin-right: 10px;
    width: auto;
  }
`;

const drawerWith = 240;

const styles: StyleRulesCallback = (theme: Theme) => ({
  drawer: {
    width: drawerWith,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWith,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  drawerPaper: {
    backgroundColor: "rgb(48, 48, 48)"
  }
});

interface Props extends WithStyles<typeof styles>, WithTheme {}

interface State {
  open: boolean;
  persistent: boolean;
}

export class MyDrawer extends React.Component<Props, State> {
  state = {
    open: false,
    persistent: false
  };

  handleToggle = () => {
    if (!this.state.persistent && this.state.open) {
      this.setState({ persistent: true, open: true });
    }
    if (this.state.persistent && this.state.open) {
      this.setState({ persistent: false, open: true });
    }

    //TODO: poner mensaje de error
    return;
  };

  handleDrawerOpen = () => {
    if (this.state.persistent === true) {
      return;
    }
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    if (this.state.persistent === true) {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <Drawer
          onMouseEnter={this.handleDrawerOpen}
          onMouseLeave={this.handleDrawerClose}
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open
          })}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })
          }}
          open={this.state.open}
        >
          <DrawerToolbar>
            <IconButton onClick={this.handleToggle}>
              <MenuIcon />
            </IconButton>
          </DrawerToolbar>

          <List>
            <Router isDrawerPersistent={this.state.persistent} />
            {["Inbox", "Starred", "Send email", "Drafts"].map(
              (text: string, index: any) => (
                <StyledListItem button>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </StyledListItem>
              )
            )}
          </List>
        </Drawer>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MyDrawer);
