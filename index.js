const { prompt } = require("enquirer");

(async () => {
  const response = await prompt([
    {
      type: "select",
      name: "database",
      message: "Select database",
      choices: [
        "postgresql",
        "mysql",
        "sqlite3",
        "oracle",
        "sqlserver",
        "jdbcmysql",
        "jdbcsqlite3",
        "jdbcpostgresql",
        "jdbc",
      ],
    },
    {
      type: "multiselect",
      name: "skips",
      message: "Select skips",
      choices: [
        { name: "action-mailer", value: "--skip-action-mailer" },
        { name: "action-mailbox", value: "--skip-action-mailbox" },
        { name: "action-text", value: "--skip-action-text" },
        { name: "active-record", value: "--skip-active-record" },
        { name: "active-job", value: "--skip-active-job" },
        { name: "active-storage", value: "--skip-active-storage" },
        { name: "action-cable", value: "--skip-action-cable" },
        { name: "sprockets", value: "--skip-sprockets" },
        { name: "spring", value: "--skip-spring" },
        { name: "listen", value: "--skip-listen" },
        { name: "javascript", value: "--skip-javascript" },
        { name: "turbolinks", value: "--skip-turbolinks" },
        { name: "jbuilder", value: "--skip-jbuilder" },
        { name: "test", value: "--skip-test" },
        { name: "system-test", value: "--skip-system-test" },
        { name: "bootsnap", value: "--skip-bootsnap" },
      ],
    },
    {
      type: "select",
      name: "webpack",
      message: "Select webpack",
      choices: [
        "skip-webpack",
        "webpacker",
        "react",
        "vue",
        "angular",
        "elm",
        "stimulus",
      ],
    },
  ]);

  console.log(response);
})();
