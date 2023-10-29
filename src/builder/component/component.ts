import type { CLIResult } from "../../types";
import { writer } from "./writer";

type CreateComponentArgs = Pick<
  CLIResult,
  "type" | "folder" | "input" | "files"
>;

type CreateComponent = (args: CreateComponentArgs) => Promise<void>;

export const createComponent: CreateComponent = async ({
  input,
  folder,
  files,
}) => {
  // Create the component
  await writer({
    type: "component",
    folder,
    input,
  });

  for (const file of files) {
    await writer({
      type: file,
      folder,
      input,
    });
  }
};
