import { SignJWT, jwtVerify } from 'jose'

export interface JWTPayload {
  userId: number
  studentId: string
  role: string
  name: string
}

export async function signJWT(payload: JWTPayload, secret: string): Promise<string> {
  const secretKey = new TextEncoder().encode(secret)
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secretKey)
}

export async function verifyJWT(token: string, secret: string): Promise<JWTPayload> {
  const secretKey = new TextEncoder().encode(secret)
  const { payload } = await jwtVerify(token, secretKey)
  return payload as unknown as JWTPayload
}
