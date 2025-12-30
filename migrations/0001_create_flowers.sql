-- Create flowers table
CREATE TABLE IF NOT EXISTS flowers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL,
    image_url TEXT NOT NULL,
    x REAL NOT NULL,
    y REAL NOT NULL,
    scale REAL NOT NULL DEFAULT 1.0,
    confidence REAL DEFAULT 1.0,
    ip_address TEXT,
    created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
);

-- Create index on created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_flowers_created_at ON flowers(created_at DESC);

-- Create index on ip_address for rate limiting
CREATE INDEX IF NOT EXISTS idx_flowers_ip ON flowers(ip_address);
