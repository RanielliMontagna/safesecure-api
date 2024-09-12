import { hash } from 'bcryptjs'

export async function createHashPassword(password: string): Promise<string> {
  return await hash(password, 10)
}
