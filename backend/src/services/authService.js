import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function hashPassword(rawPassword) {
  return bcrypt.hash(rawPassword, 10);
}

export async function comparePassword(rawPassword, passwordHash) {
  return bcrypt.compare(rawPassword, passwordHash);
}

export function createJwt(user) {
  return jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET,
    { subject: user._id.toString(), expiresIn: '7d' }
  );
}
