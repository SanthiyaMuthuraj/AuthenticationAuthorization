// controllers/UserController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user';

class UserController {
  public static async register(req: Request, res: Response): Promise<void> {
    try {
      // Assuming the request body contains user details
      const { name, email, password, age, role } = req.body;

      // Check if user with the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ error: 'User with this email already exists.' });
        return;
      }

      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        age,
        role,
      });

      // Save the user to the database
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public static async login(req: Request, res: Response): Promise<void> {
    try {
      // Assuming the request body contains login details
      const { email, password } = req.body;

      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        res.status(401).json({ error: 'Invalid email or password.' });
        return;
      }

      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        res.status(401).json({ error: 'Invalid email or password.' });
        return;
      }

      // Generate a token for the user
      const token = jwt.sign({ userId: user._id, role: user.role }, 'your-secret-key', {
        expiresIn: '1h',
      });
      user.tokens.push(token);
      await user.save();
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default UserController;
