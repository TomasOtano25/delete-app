import * as React from "react";
import { storiesOf } from "@storybook/react";

import UserHeader from ".";

storiesOf("UserHeader", module).add("default", () => (
  <UserHeader avatarUrl="/images/avatar.jpg" name="Tomas Garcia" role="Admin" />
));
