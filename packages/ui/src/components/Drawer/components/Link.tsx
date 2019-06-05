import * as React from "react";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/Inbox";

import { StyledListItem } from "../index";

interface Props {
  title: string;
  route: string;
  icon: string;
}

export const Link: React.FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  return (
    <StyledListItem button>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary={props.title} />
    </StyledListItem>
  );
};

export default Link;
