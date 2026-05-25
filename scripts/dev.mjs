import { spawn } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const frontendPort = Number(process.env.FRONTEND_PORT || 3000);
const backendPort = Number(process.env.BACKEND_PORT || process.env.PORT || 3001);
const appUrl = `http://localhost:${frontendPort}/`;

function loadRootEnv() {
  const envPath = path.join(rootDir, ".env");
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    if (process.env[key]) continue;
    process.env[key] = rawValue.replace(/^["']|["']$/g, "");
  }
}

function existingCandidates(candidates) {
  return candidates.filter((candidate) => candidate === candidate.toLowerCase() || fs.existsSync(candidate));
}

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: rootDir,
      shell: false,
      stdio: options.stdio || "pipe",
      env: { ...process.env, ...options.env }
    });

    let output = "";
    child.stdout?.on("data", (chunk) => {
      output += chunk.toString();
      if (options.stdio === "inherit") process.stdout.write(chunk);
    });
    child.stderr?.on("data", (chunk) => {
      output += chunk.toString();
      if (options.stdio === "inherit") process.stderr.write(chunk);
    });
    child.on("error", reject);
    child.on("close", (code) => resolve({ code, output }));
  });
}

function isPortOpen(port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(800);
    socket.once("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.once("timeout", () => {
      socket.destroy();
      resolve(false);
    });
    socket.once("error", () => resolve(false));
    socket.connect(port, "127.0.0.1");
  });
}

async function findWorkingCommand(label, candidates, args) {
  for (const candidate of existingCandidates(candidates)) {
    const result = await run(candidate, args);
    if (result.code === 0) {
      return {
        command: candidate,
        version: result.output.trim().split(/\r?\n/)[0]
      };
    }
  }

  throw new Error(`${label} is not available from this terminal.`);
}

async function runNpm(args, options = {}) {
  if (process.env.npm_execpath) {
    return run(process.execPath, [process.env.npm_execpath, ...args], options);
  }
  return run("npm", args, options);
}

async function main() {
  loadRootEnv();

  console.log("Starting LBS GenAI local development environment...");
  console.log(`Frontend must use ${appUrl} for Auth0 local callbacks.`);

  if (await isPortOpen(frontendPort)) {
    throw new Error(`Port ${frontendPort} is already in use. Free it or deliberately update Auth0 before changing ports.`);
  }
  if (await isPortOpen(backendPort)) {
    throw new Error(`Port ${backendPort} is already in use. Free it before starting the backend.`);
  }

  const npmCheck = await runNpm(["--version"]);
  if (npmCheck.code !== 0) {
    throw new Error("npm is not available from this terminal.");
  }
  const npmVersion = npmCheck.output.trim().split(/\r?\n/)[0];
  console.log(`npm: ${npmVersion}`);

  const psql = await findWorkingCommand(
    "PostgreSQL psql",
    process.platform === "win32"
      ? [
          "C:\\Program Files\\PostgreSQL\\18\\bin\\psql.exe",
          "C:\\Program Files\\PostgreSQL\\17\\bin\\psql.exe",
          "C:\\Program Files\\PostgreSQL\\16\\bin\\psql.exe",
          "psql"
        ]
      : ["psql"],
    ["--version"]
  );
  const psqlVersion = psql.version;
  console.log(`PostgreSQL client: ${psqlVersion}`);

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing or empty. Add it to the root .env after creating the local PostgreSQL database.");
  } else {
    const dbCheck = await run(psql.command, [process.env.DATABASE_URL, "-c", "select 1"]);
    if (dbCheck.code !== 0) {
      console.warn("PostgreSQL is installed, but Prisma could not verify DATABASE_URL. Check that the database exists and PostgreSQL is running.");
    } else {
      console.log("PostgreSQL database connection verified.");
    }
  }

  console.log("Running Prisma generation and migrations...");
  const prisma = await runNpm(["exec", "--", "prisma", "migrate", "dev", "--schema", "prisma/schema.prisma", "--name", "init"], {
    stdio: "inherit"
  });
  if (prisma.code !== 0) {
    throw new Error("Prisma migration failed. Fix the database connection before continuing.");
  }

  console.log(`Open ${appUrl} in your browser.`);

  const serverArgs = process.env.npm_execpath
    ? [process.env.npm_execpath, "--prefix", "server", "run", "dev"]
    : ["--prefix", "server", "run", "dev"];
  const clientArgs = process.env.npm_execpath
    ? [process.env.npm_execpath, "--prefix", "client", "run", "dev"]
    : ["--prefix", "client", "run", "dev"];

  const server = spawn(process.env.npm_execpath ? process.execPath : "npm", serverArgs, {
    cwd: rootDir,
    shell: false,
    stdio: "inherit",
    env: { ...process.env, PORT: String(backendPort) }
  });

  const client = spawn(process.env.npm_execpath ? process.execPath : "npm", clientArgs, {
    cwd: rootDir,
    shell: false,
    stdio: "inherit",
    env: { ...process.env, PORT: String(frontendPort) }
  });

  const shutdown = () => {
    server.kill();
    client.kill();
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
