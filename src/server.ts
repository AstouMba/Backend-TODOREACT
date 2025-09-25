import AMapp from "./app.js";
import { AMPORT } from "./config/env.js";

// const AMPORT = process.env.AMPORT || 3000;

AMapp.listen(AMPORT, () => {
  console.log(`🚀 Server running on http://localhost:${AMPORT}`);
});
