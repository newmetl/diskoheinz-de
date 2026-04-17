import path from "node:path";
import fs from "node:fs";
import Database from "better-sqlite3";
import type { Gig } from "@/data/types";
import seedGigs from "@/data/gigs.json";

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "diskoheinz.sqlite");

fs.mkdirSync(DATA_DIR, { recursive: true });

let _db: Database.Database | null = null;

function getDb(): Database.Database {
  if (_db) return _db;
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS gigs (
      id           TEXT PRIMARY KEY,
      title        TEXT NOT NULL,
      venue        TEXT NOT NULL DEFAULT '',
      city         TEXT NOT NULL DEFAULT '',
      country      TEXT,
      starts_at    TEXT NOT NULL,
      stage        TEXT,
      lineup       TEXT,      -- JSON array
      description  TEXT,
      flyer_url    TEXT,
      event_url    TEXT,
      ticket_url   TEXT,
      status       TEXT NOT NULL DEFAULT 'confirmed',
      is_headliner INTEGER NOT NULL DEFAULT 0,
      is_private   INTEGER NOT NULL DEFAULT 0,
      created_at   TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at   TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_gigs_starts_at ON gigs(starts_at);

    CREATE TABLE IF NOT EXISTS settings (
      key        TEXT PRIMARY KEY,
      value      TEXT,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  const { count } = db.prepare("SELECT COUNT(*) AS count FROM gigs").get() as {
    count: number;
  };
  if (count === 0) {
    const insert = db.prepare(`
      INSERT INTO gigs (id, title, venue, city, country, starts_at,
                        stage, lineup, description, event_url, ticket_url,
                        status, is_headliner, is_private)
      VALUES (@id, @title, @venue, @city, @country, @starts_at,
              @stage, @lineup, @description, @event_url, @ticket_url,
              @status, @is_headliner, @is_private)
    `);
    const seed = db.transaction((gigs: Gig[]) => {
      for (const g of gigs) {
        insert.run({
          id: g.id,
          title: g.title,
          venue: g.venue ?? "",
          city: g.city ?? "",
          country: g.country ?? null,
          starts_at: g.starts_at.slice(0, 10),
          stage: g.stage ?? null,
          lineup: g.lineup ? JSON.stringify(g.lineup) : null,
          description: g.description ?? null,
          event_url: g.event_url ?? null,
          ticket_url: g.ticket_url ?? null,
          status: g.status,
          is_headliner: g.is_headliner ? 1 : 0,
          is_private: g.is_private ? 1 : 0,
        });
      }
    });
    seed(seedGigs as Gig[]);
  }

  _db = db;
  return db;
}

type Row = {
  id: string;
  title: string;
  venue: string;
  city: string;
  country: string | null;
  starts_at: string;
  stage: string | null;
  lineup: string | null;
  description: string | null;
  event_url: string | null;
  ticket_url: string | null;
  status: Gig["status"];
  is_headliner: number;
  is_private: number;
};

function rowToGig(r: Row): Gig {
  return {
    id: r.id,
    title: r.title,
    venue: r.venue,
    city: r.city,
    country: r.country ?? undefined,
    starts_at: r.starts_at.slice(0, 10),
    stage: r.stage ?? undefined,
    lineup: r.lineup ? (JSON.parse(r.lineup) as string[]) : undefined,
    description: r.description ?? undefined,
    event_url: r.event_url ?? undefined,
    ticket_url: r.ticket_url ?? undefined,
    status: r.status,
    is_headliner: r.is_headliner === 1 ? true : undefined,
    is_private: r.is_private === 1 ? true : undefined,
  };
}

export function listGigs(): Gig[] {
  const rows = getDb()
    .prepare("SELECT * FROM gigs ORDER BY starts_at ASC")
    .all() as Row[];
  return rows.map(rowToGig);
}

export function getGig(id: string): Gig | null {
  const row = getDb().prepare("SELECT * FROM gigs WHERE id = ?").get(id) as
    | Row
    | undefined;
  return row ? rowToGig(row) : null;
}

export type GigInput = Omit<Gig, "id">;

export function createGig(input: GigInput): Gig {
  const id = crypto.randomUUID();
  getDb()
    .prepare(
      `INSERT INTO gigs (id, title, venue, city, country, starts_at,
        stage, lineup, description, event_url, ticket_url,
        status, is_headliner, is_private)
       VALUES (@id, @title, @venue, @city, @country, @starts_at,
        @stage, @lineup, @description, @event_url, @ticket_url,
        @status, @is_headliner, @is_private)`,
    )
    .run({
      id,
      title: input.title,
      venue: input.venue ?? "",
      city: input.city ?? "",
      country: input.country ?? null,
      starts_at: input.starts_at,
      stage: input.stage ?? null,
      lineup: input.lineup && input.lineup.length
        ? JSON.stringify(input.lineup)
        : null,
      description: input.description ?? null,
      event_url: input.event_url ?? null,
      ticket_url: input.ticket_url ?? null,
      status: input.status,
      is_headliner: input.is_headliner ? 1 : 0,
      is_private: input.is_private ? 1 : 0,
    });
  return getGig(id)!;
}

export function updateGig(id: string, input: GigInput): Gig | null {
  const existing = getGig(id);
  if (!existing) return null;
  getDb()
    .prepare(
      `UPDATE gigs SET
        title=@title, venue=@venue, city=@city, country=@country,
        starts_at=@starts_at, stage=@stage, lineup=@lineup,
        description=@description, event_url=@event_url,
        ticket_url=@ticket_url, status=@status, is_headliner=@is_headliner,
        is_private=@is_private, updated_at=datetime('now')
       WHERE id=@id`,
    )
    .run({
      id,
      title: input.title,
      venue: input.venue ?? "",
      city: input.city ?? "",
      country: input.country ?? null,
      starts_at: input.starts_at,
      stage: input.stage ?? null,
      lineup: input.lineup && input.lineup.length
        ? JSON.stringify(input.lineup)
        : null,
      description: input.description ?? null,
      event_url: input.event_url ?? null,
      ticket_url: input.ticket_url ?? null,
      status: input.status,
      is_headliner: input.is_headliner ? 1 : 0,
      is_private: input.is_private ? 1 : 0,
    });
  return getGig(id);
}

export function deleteGig(id: string): Gig | null {
  const existing = getGig(id);
  if (!existing) return null;
  getDb().prepare("DELETE FROM gigs WHERE id = ?").run(id);
  return existing;
}

export function getSetting(key: string): string | null {
  const row = getDb()
    .prepare("SELECT value FROM settings WHERE key = ?")
    .get(key) as { value: string | null } | undefined;
  return row?.value ?? null;
}

export function setSetting(key: string, value: string | null): void {
  if (value === null) {
    getDb().prepare("DELETE FROM settings WHERE key = ?").run(key);
    return;
  }
  getDb()
    .prepare(
      `INSERT INTO settings (key, value, updated_at) VALUES (?, ?, datetime('now'))
       ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')`,
    )
    .run(key, value);
}
