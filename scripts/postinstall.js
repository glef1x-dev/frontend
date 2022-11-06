/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { execa } from "execa";

try {
  await execa("npx", ["tsc", "--build"], { stdin: "inherit" });
} catch (err) {
  console.error(err);
}
