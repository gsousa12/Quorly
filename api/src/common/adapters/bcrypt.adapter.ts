import * as bcrypt from 'bcrypt';

export class BcryptAdapter {
  private readonly SALT_ROUNDS = 10;
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  async compare(password: string, userPassword: string): Promise<boolean> {
    return bcrypt.compare(password, userPassword);
  }
}
