import * as React from "react";
import * as routes from "./routes.json";

import { Accordion } from "./components/Accordion";
import { Link } from "./components/Link";

interface Props {
  isDrawerPersistent: boolean;
}

export const Router: React.FunctionComponent<Props> = ({
  isDrawerPersistent
}): JSX.Element => {
  return (
    <>
      {routes.map(route => {
        if (route.children) {
          return (
            <Accordion isDrawerPersistent={isDrawerPersistent} {...route} />
          );
        }
        if (!route.children) {
          return <Link {...route} />;
        }
        return null;
      })}
    </>
  );
};
