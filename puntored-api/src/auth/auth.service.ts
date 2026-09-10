import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  private hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  async register(username: string, password: string) {
    const passwordHash = this.hashPassword(password);
    const user = new this.userModel({ username, passwordHash });
    return user.save();
  }

  async validateUser(username: string, password: string) {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) return null;

    const passwordHash = this.hashPassword(password);
    if (user.passwordHash !== passwordHash) return null;

    return user;
  }

  async login(user: UserDocument) {
  const payload = { sub: user._id.toString(), username: user.username };
  return {
    access_token: this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET, 
      expiresIn: '1h',                
    }),
  };
}

}
