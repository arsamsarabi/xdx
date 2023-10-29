import { CLIFlags, CLIResult, FileTypes } from "../types";
import { getFileNameWithExtension, getNameAndPathFromInput } from "../utils";

type Project = {
  type: string;
  validateType: unknown;
  input: unknown;
  folder: boolean;
  language: string;
  __: unknown;
  include: unknown;
};

type GenerateResultArgs = {
  flags: CLIFlags;
  project: Project;
};

type GenerateResult = (args: GenerateResultArgs) => CLIResult;

export const generateResult: GenerateResult = ({ flags, project }) => {
  const userSelectedTypes = (project.include ?? []) as FileTypes[];
  const filesToWrite = [
    ...userSelectedTypes,
    project.folder ? "index" : undefined,
  ].filter(Boolean) as FileTypes[];
  const result: CLIResult = {
    flags: {
      ...flags,
    },
    input: project.input as string,
    folder: project.folder,
    files: filesToWrite,
    type: project.type as FileTypes,
  };
  return result;
};

export const getDefaultResults = (): CLIResult => ({
  flags: { default: true },
  input: "MyComponent",
  folder: false,
  files: ["component"],
  type: "component",
});
