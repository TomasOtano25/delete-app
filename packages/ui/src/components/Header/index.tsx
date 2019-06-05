import * as React from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
/*import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";*/

const styles = {
  root: {
    flexGrow: 1
  }
};

export interface Props extends WithStyles<typeof styles> {}

export class Header extends React.Component<Props> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <div />
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
