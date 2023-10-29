import ejs from "ejs";
import { outputFile } from "fs-extra";
import ora from "ora";
import { PKG_ROOT } from "../../constants";
import { CLIResult } from "../../types";
import {
  getFileNameWithExtension,
  getFullPath,
  getNameAndPathFromInput,
} from "../../utils";

type WriterArgs = Pick<CLIResult, "type" | "folder" | "input">;

type Writer = (args: WriterArgs) => Promise<void>;

export const writer: Writer = async ({ type, folder, input }) => {
  const spinner = ora(`Creating ${type} file`).start();
  const [path, name] = getNameAndPathFromInput(input);
  const filename = getFileNameWithExtension({
    name,
    type,
  });
  const fullPath = getFullPath({
    filename,
    folder,
    name,
    path,
    type,
  });

  const template = await ejs.renderFile(
    `${PKG_ROOT}templates/${type}.ejs`,
    { name },
    {
      async: true,
      beautify: true,
      filename,
    }
  );

  await outputFile(fullPath, template);

  spinner.succeed(`${name} ${type} created!`);
};
