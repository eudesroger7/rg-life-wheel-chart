import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

const external = ["react", "react-dom", "react/jsx-runtime"];

export default [
  {
    input: "src/index.ts",
    external,
    output: [
      {
        file: "dist/index.cjs.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
      }),
    ],
  },
  {
    input: "src/index.ts",
    external,
    output: { file: "dist/index.d.ts", format: "esm" },
    plugins: [dts()],
  },
];
