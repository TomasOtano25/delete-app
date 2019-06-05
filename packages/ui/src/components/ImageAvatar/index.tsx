import * as React from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";

import Avatar from "@material-ui/core/Avatar";

const styles = {
  avatar: {
    margin: 10
  }
};

interface Props extends WithStyles<typeof styles> {
  src: string;
}

export const ImageAvatar: React.FunctionComponent<Props> = ({
  classes,
  src
}: Props) => <Avatar src={src} className={classes.avatar} />;

export default withStyles(styles)(ImageAvatar);
