import OMapp from "./app.js";
import { OMPORT } from "./config/env.js";
// const OMPORT = process.env.OMPORT || 3000;
OMapp.listen(OMPORT, () => {
    console.log(`🚀 Server running on http://localhost:${OMPORT}`);
});
//# sourceMappingURL=server.js.map