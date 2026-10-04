"""
EventEase - One-Click Neon PostgreSQL Initializer
Usage:
    export DATABASE_URL="postgresql://user:pass@ep-xyz.neon.tech/neondb?sslmode=require"
    python init_db.py
"""

import os
import sys
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.environ.get("DATABASE_URL", "").strip()
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)


def main():
    if not DATABASE_URL:
        print("ERROR: DATABASE_URL environment variable is not set!")
        print("Please copy your Neon Connection String into .env or Render Environment Variables.")
        sys.exit(1)

    import psycopg2
    print("Connecting to Neon PostgreSQL Database...")
    conn = psycopg2.connect(DATABASE_URL)
    with conn.cursor() as cur:
        with open("schema.sql", "r", encoding="utf-8") as f:
            sql_script = f.read()
        cur.execute(sql_script)
        conn.commit()
    conn.close()
    print("✅ SUCCESS! EventEase tables & seed data (Venues, Menus, Decor, Plans) created in Neon DB!")


if __name__ == "__main__":
    main()
