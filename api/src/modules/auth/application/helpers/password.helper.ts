export function generateUserTemporaryPassword(): string {
  const temporaryPasswordLength = 10;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';

  for (let i = 0; i < temporaryPasswordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }

  return password;
}

export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await this.bcryptAdapter.hash(password);
  return hashedPassword;
}
