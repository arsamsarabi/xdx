import * as p from "@clack/prompts";
import chalk from "chalk";
import { APP_NAME, RICH_LILAC } from "../constants";
import { getVersion, validatedName } from "../utils";
import type { FileTypes } from "../types";

const COMING_SOON = "Coming soon";

const fileTypeOptions: Array<{
  value: FileTypes;
  label: string;
  hint?: string;
  enabled: boolean;
}> = [
  { value: "component", label: "Component", enabled: true },
  { value: "hook", label: "Hook", hint: COMING_SOON, enabled: false },
  { value: "page", label: "Page", hint: COMING_SOON, enabled: false },
  { value: "css", label: "CSS Module", hint: COMING_SOON, enabled: false },
  { value: "test", label: "Test file", hint: COMING_SOON, enabled: false },
  {
    value: "story",
    label: "Storybook file",
    hint: COMING_SOON,
    enabled: false,
  },
  {
    value: "styled",
    label: "Styled Component",
    hint: COMING_SOON,
    enabled: false,
  },
];

export const runProject = async () => {
  p.intro(chalk.hex(RICH_LILAC)(`${APP_NAME} - ${getVersion()}`));

  const project = await p.group(
    {
      type: () => {
        return p.select({
          message: "What are we building this time?",
          options: fileTypeOptions,
          initialValue: "component",
        });
      },
      validateType: ({ results }) => {
        const inEnabled = fileTypeOptions.find(
          (option) => option.value === results.type
        )?.enabled;

        if (!inEnabled) {
          p.note(
            chalk.redBright(
              "Sorry, that option is not yet available. Stay tuned!"
            )
          );
          process.exit(1);
        }
      },
      input: async ({ results }) => {
        const toBuildLabel = fileTypeOptions.find(
          (option) => option.value === results.type
        )?.label;
        return p.text({
          message: `What is the name of your new ${toBuildLabel}?`,
          defaultValue: "MyComponent",
          validate: validatedName,
        });
      },
      folder: () => {
        return p.confirm({
          message:
            "Would you like to create a folder with the same name for this component?",
          initialValue: true,
        });
      },
      language: () => {
        return p.select({
          message: "Will you be using TypeScript or JavaScript?",
          options: [
            { value: "typescript", label: "TypeScript" },
            { value: "javascript", label: "JavaScript" },
          ],
          initialValue: "typescript",
        });
      },
      __: ({ results }) =>
        results.language === "javascript"
          ? p.note(chalk.redBright("Wrong answer, using TypeScript instead"))
          : undefined,
      include: ({ results }) => {
        if (results.type !== "component") return undefined;
        return p.multiselect({
          message: "What would you like to include?",
          options: [
            { value: "css", label: "CSS Module" },
            { value: "test", label: "Test file" },
            { value: "story", label: "Storybook file" },
            { value: "styled", label: "Styled Component" },
          ],
        });
      },
    },
    {
      onCancel() {
        process.exit(1);
      },
    }
  );

  p.outro(chalk.hex(RICH_LILAC)("🎉  All done!"));

  return project;
};
