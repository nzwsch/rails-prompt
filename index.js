const util = require("util");
const execFile = util.promisify(require("child_process").execFile);
const { spawn } = require("child_process");
const { prompt } = require("enquirer");

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
      choices: ["postgresql", "mysql", "sqlite3", "oracle", "sqlserver", "jdbcmysql", "jdbcsqlite3", "jdbcpostgresql", "jdbc"],
    },
    {
      type: "multiselect",
      name: "skips",
      message: "Select skips",
      choices: [
        "--skip-action-mailer",
        "--skip-action-mailbox",
        "--skip-action-text",
        "--skip-active-record",
        "--skip-active-job",
        "--skip-active-storage",
        "--skip-action-cable",
        "--skip-sprockets",
        "--skip-spring",
        "--skip-listen",
        "--skip-javascript",
        "--skip-turbolinks",
        "--skip-jbuilder",
        "--skip-test",
        "--skip-system-test",
        "--skip-bootsnap",
      ],
    },
    {
      type: "select",
      name: "webpack",
      message: "Select webpack",
      choices: ["skip-webpack", "webpacker", "react", "vue", "angular", "elm", "stimulus"],
    },
  ]);
  const APP_PATH = response.APP_PATH;
  const database = `--database=${response.database}`;
  const skips = response.skips.join(" ");
  let webpack;
  switch (response.webpack) {
    case "skip-webpack":
      webpack = "--skip-webpack-install";
      break;
    case "webpacker":
      webpack = "--webpacker";
      break;
    default:
      webpack = `--webpack=${response.webpack}`;
  }
  const { stdout } = await execFile("echo", ["rails", "new", APP_PATH, database, skips, webpack]);
  process.stdout.write(stdout);
  const toggle = await prompt({
    type: "toggle",
    message: "Want to run?",
    enabled: "Yep",
    disabled: "Nope",
  });
  if (toggle) {
    const rails = spawn("rails", ["new", APP_PATH, database, skips, webpack]);
    rails.stdout.on("data", (data) => process.stdout.write(data.toString()));
    rails.stderr.on("data", (data) => process.stderr.write(data.toString()));
  }
})();
