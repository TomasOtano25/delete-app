import Routes, * as nextRoutes from "next-routes";

// @ts-ignore
export const routes = nextRoutes() as Routes;
export const router = routes.Router;
export const Link = routes.Link;

routes.add("movies", "/movies");
