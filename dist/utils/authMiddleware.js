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
exports.authorizeAdmin = exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Extract token from headers
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        console.log('Token:', token);
        if (!token) {
            res.status(401).json({ error: 'Authentication failed. Token not provided.' });
            return;
        }
        // Verify the token
        const decodedToken = jsonwebtoken_1.default.verify(token, 'your-secret-key');
        console.log('Decoded Token:', decodedToken);
        // Attach user information to the request for later use
        const user = yield user_1.default.findById(decodedToken.userId);
        console.log('User:', user);
        if (!user) {
            res.status(401).json({ error: 'Invalid token. User not found.' });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error('Error authenticating user:', error);
        res.status(401).json({ error: 'Authentication failed. Invalid token.' });
    }
});
exports.authenticateUser = authenticateUser;
const authorizeAdmin = (req, res, next) => {
    // Check if the authenticated user is an admin
    if (req.user && req.user.role === 'admin') {
        next();
    }
    else {
        res.status(403).json({ error: 'Authorization failed. User is not an admin.' });
    }
};
exports.authorizeAdmin = authorizeAdmin;
