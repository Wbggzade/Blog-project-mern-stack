import jwt from 'jsonwebtoken';

// Generate a JWT token for a user
// Payload contains user ID.
// Token expires in 7 days.
export default function generateToken(userId) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  return jwt.sign({ userId }, secret, { expiresIn: '7d' });
}
