export type FileTypes =
  | "component"
  | "css"
  | "hook"
  | "index"
  | "page"
  | "story"
  | "styled"
  | "test";

export type CLIFlags = { default: boolean };

export type CLIResult = {
  flags: CLIFlags;
  input: string;
  folder: boolean;
  files: Array<FileTypes>;
  type: FileTypes;
};
