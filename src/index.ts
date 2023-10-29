#!/usr/bin/env node

import { runCli } from "./cli";
import { renderTitle, logger } from "./utils";
import { build } from "./builder";

const main = async () => {
  // CLI
  await renderTitle();
  const cliResponse = await runCli();

  // Builder
  await build(cliResponse);
};

main().catch((err) => {
  logger.error("🚨 Abort! Something went wrong");

  if (err instanceof Error) {
    logger.error(err);
  } else {
    logger.error(
      "An unknown error has occurred. Please open an issue on github with the below:"
    );
    console.log(err);
  }

  process.exit(1);
});
