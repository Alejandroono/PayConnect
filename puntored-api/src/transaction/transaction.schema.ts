import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true })
  cellPhone!: string;

  @Prop({ required: true })
  value!: number;

  @Prop({ required: true })
  supplierId!: string;

  @Prop({ default: 'success' })
  status!: string;

  @Prop()
  transactionId?: string;

  @Prop()
  supplierName?: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
