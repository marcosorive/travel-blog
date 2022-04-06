const { parse } = require("pg-connection-string");

module.exports = ({ env }) => {
  const { host, port, database, user, password } = parse(env("DATABASE_URL"));
  const shoulUseSqlite = process.env.DATABASE_TYPE_SQLITE === 'true';

  const postgresSettings = {
    client: "postgres",
    host,
    port,
    database,
    username: user,
    password,
    ssl: { rejectUnauthorized: false }
  }

  const sqliteSettings = {
    client: 'sqlite',
    filename: '.tmp/data.db'
  }

  if (shoulUseSqlite) {
    console.log("Running with SQLITE")
  } else {
    console.log("Running with POSTGRES")
  }

  return {
    defaultConnection: 'default',
    connections: {
      default: {
        connector: 'bookshelf',
        settings: shoulUseSqlite ? sqliteSettings : postgresSettings,
        options: {
          useNullAsDefault: true,
        },
      },
    }
  }
};





