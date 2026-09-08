import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './transaction.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
  ) {}

  async create(data: Partial<Transaction>): Promise<Transaction> {
    const transaction = new this.transactionModel(data);
    return transaction.save();
  }

  async findByUser(userId: string): Promise<Transaction[]> {
    return this.transactionModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }
}
