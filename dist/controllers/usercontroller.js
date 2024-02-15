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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
class UserController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Assuming the request body contains user details
                const { name, email, password, age, role } = req.body;
                // Check if user with the email already exists
                const existingUser = yield user_1.default.findOne({ email });
                if (existingUser) {
                    res.status(400).json({ error: 'User with this email already exists.' });
                    return;
                }
                // Hash the password before saving it to the database
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                // Create a new user
                const newUser = new user_1.default({
                    name,
                    email,
                    password: hashedPassword,
                    age,
                    role,
                });
                // Save the user to the database
                yield newUser.save();
                res.status(201).json({ message: 'User registered successfully.' });
            }
            catch (error) {
                console.error('Error registering user:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Assuming the request body contains login details
                const { email, password } = req.body;
                // Check if the user exists
                const user = yield user_1.default.findOne({ email });
                if (!user) {
                    res.status(401).json({ error: 'Invalid email or password.' });
                    return;
                }
                // Compare the provided password with the hashed password in the database
                const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!passwordMatch) {
                    res.status(401).json({ error: 'Invalid email or password.' });
                    return;
                }
                // Generate a token for the user
                const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, 'your-secret-key', {
                    expiresIn: '1h',
                });
                user.tokens.push(token);
                yield user.save();
                res.status(200).json({ token });
            }
            catch (error) {
                console.error('Error logging in:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.default = UserController;
