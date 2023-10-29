import type { CLIResult } from "../types";
import { getFlags } from "./program";
import { runProject } from "./project";
import { generateResult, getDefaultResults } from "./generateResult";

export const runCli = async (): Promise<CLIResult> => {
  const { flags } = getFlags();

  if (flags.default) {
    return getDefaultResults();
  }

  const project = await runProject();

  return generateResult({
    flags,
    project,
  });
};
