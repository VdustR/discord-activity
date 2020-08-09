import commonjs from "@rollup/plugin-commonjs";
import json from '@rollup/plugin-json';
import resolve from "@rollup/plugin-node-resolve";
import builtins from "builtin-modules";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";

const isDevelopment = process.env.BUILD === "development";

export default [
  {
    input: "src/frontend/app.tsx",
    output: {
      file: "dist/frontend/app.js",
      format: "cjs",
      name: "discordActivity",
      sourcemap: isDevelopment ? "inline" : true,
    },
    plugins: [
      json(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "tsconfig.json",
        include: ["*.ts+(|x)", "**/*.ts+(|x)", "**/*.vue"],
      }),
      ...(isDevelopment ? [] : [terser()]),
    ],
    external: [...builtins, "electron"],
  },
];
