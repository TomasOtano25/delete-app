import * as React from "react";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/Inbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import styled from "styled-components";

import { StyledListItem } from "../index";

interface Props {
  isDrawerPersistent?: boolean;
  title: string;
  icon: string;
  children: any;
}

const WrapperAccordion = styled.div`
  background: ${(props: { open: boolean }) =>
    props.open ? "#111" : "inherit"};
`;

/*<ListItemIcon>
    <InboxIcon />
  </ListItemIcon>
  <ListItemText primary={props.title} />*/

export const Accordion: React.FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const { isDrawerPersistent } = props;

  return (
    <WrapperAccordion open={open}>
      <StyledListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText inset primary={props.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </StyledListItem>
      <div hidden={isDrawerPersistent}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List>
            <StyledListItem button>
              <ListItemText primary="example" />
            </StyledListItem>
          </List>
        </Collapse>
      </div>
    </WrapperAccordion>
  );
};

export default Accordion;
