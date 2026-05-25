import { createServer } from "./server.js";
import { config } from "./config/env.js";

const app = createServer();

app.listen(config.port, () => {
  console.log(`API listening on http://localhost:${config.port}`);
});
