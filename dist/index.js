"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: ["http://localhost:3000", "http://example.com"],
};
const corsMiddleware = (0, cors_1.default)(corsOptions);
app.use(corsMiddleware);
dotenv_1.default.config();
const port = process.env.PORT || 8080;
app.use(express_1.default.json());
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
mongoose_1.default
    .connect(process.env.DB_CONNECTION)
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});
const userSchema = new mongoose_1.default.Schema({
    username: String,
    email: String,
});
const User = mongoose_1.default.model("User", userSchema);
app.get("/", (_req, res) => {
    return res.send("Express Typescript on Vercel");
});
app.get("/ping", (_req, res) => {
    return res.send("pong 🏓");
});
app.post("/users", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User.create(_req.body);
    res.status(201).json({
        status: "success",
        users,
    });
}));
app.get("/users", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User.find();
    res.status(200).json({
        status: "success",
        results: users.length,
        users,
    });
}));
//# sourceMappingURL=index.js.map