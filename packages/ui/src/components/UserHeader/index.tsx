import * as React from "react";
import { Flex } from "rebass";
import { withStyles } from "@material-ui/core/styles";

// import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import Button from "@material-ui/core/Button";
import ImageAvatar from "../ImageAvatar";
import Hidden from "@material-ui/core/Hidden";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const StyledTextName = styled.div`
  text-transform: none;
  font-weight: bold;
`;

const StyledTextRole = styled.div`
  text-transform: none;
  font-size: 0.8rem;
`;

const StyledExitToAppIcon = styled(ExitToAppIcon)`
  margin-right: 16px;
  color: rgba(0, 0, 0, 0.54);
`;

/*const StyledArrowBackIcon = styled.div`
  font-size: 6px;
  margin: 0px;
`;*/

const styles = {
  button: {
    margin: 0
  }
};

interface Props {
  avatarUrl: string;
  name: string;
  role: string;
  onLogoutClick?: () => {};
}

export class UserHeader extends React.Component<Props, { open: boolean }> {
  state = {
    open: false
  };

  anchorEl: any;

  handleToogle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = (event: React.ChangeEvent) => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { avatarUrl, name, role } = this.props;
    const { open } = this.state;
    return (
      <>
        <Button
          buttonRef={node => {
            this.anchorEl = node;
          }}
          aria-owns={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={this.handleToogle}
        >
          <ImageAvatar src={avatarUrl} />
          <Hidden smDown>
            <Flex
              flexDirection="column"
              alignItems="start"
              mr={10}
              width={[0, 1]}
            >
              <StyledTextName>{name}</StyledTextName>
              <StyledTextRole>{role}</StyledTextRole>
            </Flex>
          </Hidden>
          <Hidden xsDown>
            <KeyboardArrowDownIcon fontSize="small" />
          </Hidden>
        </Button>
        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            //@ts-ignore
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList id="simple-menu">
                    <MenuItem>
                      <StyledExitToAppIcon />
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
    );
  }
}

export default withStyles(styles)(UserHeader);
