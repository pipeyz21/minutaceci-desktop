import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.es2021 } } },
  pluginJs.configs.recommended,
  ...pluginReact.configs.recommended,
  {
    plugins: {
      react: pluginReact,
    },
    rules: {
      // Desactivar la regla que requiere React en el scope
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];