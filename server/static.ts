import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist (Express-compatible catch-all)
  app.use((req, res, next) => {
    // If a static file was served, this middleware won't be reached. For any
    // unmatched path, return the client index.html so the SPA router can handle it.
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
