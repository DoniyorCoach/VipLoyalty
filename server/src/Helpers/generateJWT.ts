import jwt from 'jsonwebtoken';

const generateJWT = (id: string) => jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '30d' });

export default generateJWT;
