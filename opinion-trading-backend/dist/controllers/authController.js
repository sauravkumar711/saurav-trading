"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class AuthController {
    async register(req, res) {
        const { username, email, password } = req.body;
        try {
            // Check if the user already exists
            const existingUser = await userModel_1.default.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const hashedPassword = await bcryptjs_1.default.hash(password, 10);
            const newUser = new userModel_1.default({ username, email, password: hashedPassword, role: 'user', balance: 0 });
            await newUser.save();
            res.status(201).json({ message: 'User registered successfully' });
        }
        catch (error) {
            console.error('Registration Error:', error);
            res.status(500).json({ message: 'Error registering user', error });
        }
    }
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await userModel_1.default.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const isMatch = await bcryptjs_1.default.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role, balance: user.balance } });
        }
        catch (error) {
            console.error('Login Error:', error);
            res.status(500).json({ message: 'Error logging in', error });
        }
    }
    async getProfile(req, res) {
        try {
            const user = await userModel_1.default.findById(req.user?.id).select('-password'); // Exclude password
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        }
        catch (error) {
            console.error('Profile Fetch Error:', error);
            res.status(500).json({ message: 'Error fetching profile', error });
        }
    }
}
exports.authController = new AuthController();
