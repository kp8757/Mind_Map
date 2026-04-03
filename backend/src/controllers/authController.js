import { User } from '../models/User.js';
import { comparePassword, createJwt, hashPassword } from '../services/authService.js';

export async function signup(req, res) {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: 'Email already in use' });
  }

  const passwordHash = await hashPassword(password);
  const user = await User.create({ name, email, passwordHash });

  return res.status(201).json({
    token: createJwt(user),
    user: { id: user._id, name: user.name, email: user.email }
  });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.passwordHash) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const validPassword = await comparePassword(password, user.passwordHash);
  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  return res.json({
    token: createJwt(user),
    user: { id: user._id, name: user.name, email: user.email }
  });
}

export async function googleLogin(req, res) {
  const { googleId, email, name } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ name, email, googleId });
  }

  return res.json({
    token: createJwt(user),
    user: { id: user._id, name: user.name, email: user.email }
  });
}
