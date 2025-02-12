import sqlite3 from "sqlite3";

const db = new sqlite3.Database("data/database.sqlite");

const initializeDB = async () => {
  await dbRun("DROP TABLE IF EXISTS novenyek");

  await dbRun(
    "CREATE TABLE IF NOT EXISTS novenyek (id INTEGER PRIMARY KEY AUTOINCREMENT, nev TEXT, evelo BOOLEAN, kategoria TEXT, ar INTEGER)"
  );

  const novenyek = [
    { nev: "Rózsa", evelo: false, kategoria: "virág", ar: 2000 },
    { nev: "Akác", evelo: true, kategoria: "fa", ar: 10000 },
  ];

  for (const noveny of novenyek) {
    await dbRun(
      "INSERT INTO novenyek (nev, evelo, kategoria, ar) VALUES (?, ?, ?, ?)",
      [noveny.nev, noveny.evelo, noveny.kategoria, noveny.ar]
    );
  }
};

function dbRun(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

function dbGet(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function dbAll(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export { db, dbRun, dbGet, dbAll, initializeDB };
