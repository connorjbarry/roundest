// src/pages/api/trpc/[trpc].ts
import { inferProcedureOutput } from "@trpc/server";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter, AppRouter } from "../../../server/router";
import { createContext } from "../../../server/router/context";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
});

export type inferQueryResponse<
  TRouteKey extends keyof AppRouter["_def"]["queries"]
> = inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;
