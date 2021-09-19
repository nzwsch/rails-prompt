"use strict";

const util = require("util");
const execFile = util.promisify(require("child_process").execFile);
const { spawn } = require("child_process");
const { prompt, Toggle } = require("enquirer");

(async () => {
  const response = await prompt([
    {
      type: "input",
      name: "APP_PATH",
      message: "Type app path",
    },
    {
      type: "select",
      name: "database",
      message: "Select database",
      choices: [
        { name: "--database=postgresql", message: "postgresql" },
        { name: "--database=mysql", message: "mysql" },
        { name: "--database=sqlite3", message: "sqlite3" },
        { name: "--database=oracle", message: "oracle" },
        { name: "--database=sqlserver", message: "sqlserver" },
        { name: "--database=jdbcmysql", message: "jdbcmysql" },
        { name: "--database=jdbcsqlite3", message: "jdbcsqlite3" },
        { name: "--database=jdbcpostgresql", message: "jdbcpostgresql" },
        { name: "--database=jdbc", message: "jdbc" },
      ],
    },
    {
      type: "multiselect",
      name: "skips",
      message: "Select skips",
      initial: [0, 1, 2, 4, 5, 6, 8, 11, 12, 14, 15],
      choices: [
        { name: "--skip-action-mailer", message: "action-mailer" },
        { name: "--skip-action-mailbox", message: "action-mailbox" },
        { name: "--skip-action-text", message: "action-text" },
        { name: "--skip-active-record", message: "active-record" },
        { name: "--skip-active-job", message: "active-job" },
        { name: "--skip-active-storage", message: "active-storage" },
        { name: "--skip-action-cable", message: "action-cable" },
        { name: "--skip-sprockets", message: "sprockets" },
        { name: "--skip-spring", message: "spring" },
        { name: "--skip-listen", message: "listen" },
        { name: "--skip-javascript", message: "javascript" },
        { name: "--skip-turbolinks", message: "turbolinks" },
        { name: "--skip-jbuilder", message: "jbuilder" },
        { name: "--skip-test", message: "test" },
        { name: "--skip-system-test", message: "system-test" },
        { name: "--skip-bootsnap", message: "bootsnap" },
      ],
    },
    {
      type: "select",
      name: "webpack",
      message: "Select webpack",
      choices: [
        { name: "--skip-webpack-install", message: "skip webpack install" },
        { name: "--webpacker", message: "webpacker" },
        { name: "--webpack=react", message: "react" },
        { name: "--webpack=vue", message: "vue" },
        { name: "--webpack=angular", message: "angular" },
        { name: "--webpack=elm", message: "elm" },
        { name: "--webpack=stimulus", message: "stimulus" },
      ],
    },
  ]);
  const { APP_PATH, database, skips, webpack } = response;
  if (APP_PATH === "") {
    console.error("APP_PATH is empty.");
    process.exit(0);
  }
  const { stdout } = await execFile("echo", ["rails", "new", APP_PATH, database, ...skips, webpack]);
  process.stdout.write(stdout);
  const toggle = await new Toggle({
    type: "toggle",
    message: "Want to run?",
    enabled: "Yep",
    disabled: "Nope",
  }).run();
  if (toggle) {
    const rails = spawn("rails", ["new", APP_PATH, database, ...skips, webpack]);
    rails.stdout.on("data", (data) => process.stdout.write(data.toString()));
    rails.stderr.on("data", (data) => process.stderr.write(data.toString()));
  }
})();
