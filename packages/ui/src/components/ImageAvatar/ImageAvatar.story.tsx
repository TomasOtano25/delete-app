import * as React from "react";
import { storiesOf } from "@storybook/react";

import ImageAvatar from ".";

storiesOf("ImageAvatar", module).add("logged in", () => (
  <ImageAvatar src="/images/avatar.jpg" />
));
