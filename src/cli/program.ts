import { Command } from "@commander-js/extra-typings";
import { APP_NAME } from "../constants";
import { getVersion } from "../utils";

export const getFlags = () => {
  const program = new Command()
    .name(APP_NAME)
    .description(
      "A CLI for creating boilerplate files and folder for React applications"
    )
    .option(
      "-y, --default",
      "Bypass the CLI and use all default options to create a new component",
      false
    )
    .version(getVersion(), "-v, --version", "Display the version number")
    .parse(process.argv);

  return {
    flags: program.opts(),
  };
};
