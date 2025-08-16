"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_2 = __importDefault(require("@trpc/server/adapters/express"));
const routers_1 = require("../routers");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use('/api/trpc', express_2.default.createExpressMiddleware({
    router: routers_1.appRouter,
    createContext: () => ({}),
}));
app.listen(3000, () => {
    console.log('tRPC server running at http://localhost:3000');
});
