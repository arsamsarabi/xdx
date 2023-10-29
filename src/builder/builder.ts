import { CLIResult } from "../types";
import { createComponent } from "./component";

type BuildArgs = Pick<CLIResult, "type" | "folder" | "input" | "files">;

export const build = async ({ type, folder, input, files }: BuildArgs) => {
  switch (type) {
    case "component":
      await createComponent({
        type,
        folder,
        input,
        files,
      });
      break;
    default:
      throw new Error("Unknown build type");
  }

  process.exit(0);
};
