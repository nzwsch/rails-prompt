const { prompt, Select } = require('enquirer');

const databasePrompt = new Select({
  name: 'database',
  message: 'Select database',
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
  ]
})

const main = async () => {
  await databasePrompt.run()
}

main()
