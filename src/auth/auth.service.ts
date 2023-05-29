import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validateUser(username: string, password: string): Promise<any> {
    if (username === 'admin' && password === 'password') {
      return { id: 1, username: 'admin' };
    }
    return null;
  }
}
