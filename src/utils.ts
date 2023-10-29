import chalk from "chalk";
import path from "path";
import fs from "fs-extra";
import { type PackageJson } from "type-fest";
import gradient from "gradient-string";
import figlet from "figlet";
import { APP_NAME, PKG_ROOT, RAINBOW } from "./constants";
import type { FileTypes } from "./types";

export const logger = {
  error(...args: unknown[]) {
    console.log(chalk.red(...args));
  },
  warn(...args: unknown[]) {
    console.log(chalk.yellow(...args));
  },
  info(...args: unknown[]) {
    console.log(chalk.cyan(...args));
  },
  success(...args: unknown[]) {
    console.log(chalk.green(...args));
  },
};

export const getVersion = () => {
  const packageJsonPath = path.join(PKG_ROOT, "package.json");
  const packageJsonContent = fs.readJSONSync(packageJsonPath) as PackageJson;
  return packageJsonContent.version ?? "1.0.0";
};

export const removeTrailingSlash = (input: string) => {
  if (input.length > 1 && input.endsWith("/")) {
    input = input.slice(0, -1);
  }

  return input;
};

export const validatedName = (rawInput: string) => {
  const validationRegExp = /^[a-zA-Z]+([-_.][a-zA-Z0-9]+)*[a-zA-Z0-9]*$/;
  const input = removeTrailingSlash(rawInput);
  const paths = input.split("/");
  let compName = paths[paths.length - 1];

  if (validationRegExp.test(compName ?? "")) {
    return;
  } else {
    return "Name must begin with a letter and contain only letters, numbers, underscores, and dashes, and only end with a letter or number.";
  }
};

export const renderTitle = async () => {
  const art = figlet.textSync(APP_NAME, { font: "Sub-Zero" });
  const asciiName = gradient(RAINBOW);
  console.log(asciiName.multiline(art));
};

export const getNameAndPathFromInput = (input: string): [string, string] => {
  let pathsArray = input.split("/");
  const name = pathsArray.pop() as string;
  const path = pathsArray.length ? pathsArray.join("/") + "/" : "";

  return [path, name];
};

const FILE_EXTENSION_MAP: Record<FileTypes, string> = {
  css: ".module.css",
  story: ".stories.tsx",
  styled: ".styles.ts",
  test: ".test.tsx",
  index: ".ts",
  component: ".tsx",
  hook: ".ts",
  page: ".tsx",
};

export const getFileNameWithExtension = ({
  name,
  type,
}: {
  name: string;
  type: FileTypes;
}) => {
  return `${name}${FILE_EXTENSION_MAP[type]}`;
};

export const getFullPath = ({
  folder,
  name,
  path,
  filename,
  type,
}: {
  folder: boolean;
  name: string;
  path: string;
  filename: string;
  type: FileTypes;
}) => {
  const _filename = type === "index" ? "index.ts" : filename;
  return folder ? `${path}${name}/${_filename}` : `${path}${_filename}`;
};
