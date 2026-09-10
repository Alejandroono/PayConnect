import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './transaction.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
  ) {}

  async create(data: {
    userId: string;
    cellPhone: string;
    value: number;
    supplierId: string;
    status?: string;
    transactionId?: string;
    supplierName?: string;
  }): Promise<Transaction> {
    const transaction = new this.transactionModel({
      userId: data.userId,
      cellPhone: data.cellPhone,
      value: data.value,
      supplierId: data.supplierId,
      status: data.status ?? 'success',
      transactionId: data.transactionId ?? null,
      supplierName: data.supplierName ?? null,
    });

    const saved = await transaction.save();
    return saved;
  }

  async findByUser(userId: string): Promise<Transaction[]> {
    return this.transactionModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }
}
