import amqp, { Channel, Connection, ConsumeMessage } from 'amqplib';
import mongoose  from 'mongoose';
import { ObjectId } from 'mongodb';

import logger from '../logger';
import { ITransaction } from '../models/Transaction';
import Account from '../models/Accounts';

const QUEUE_NAME = 'transactions';

class QueueConsumer {
  private connection: Connection | null = null;
  private channel: Channel | null = null;

  constructor(private uri: string) {}

  // Establish a connection to RabbitMQ
  async connect(): Promise<void> {
    logger.info(`Trying to connect message queue`);
    try {
      this.connection = await amqp.connect(this.uri);
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(QUEUE_NAME, { durable: true });
      logger.info('Connected to RabbitMQ for consuming');
      this.channel.consume(QUEUE_NAME, this.handleMessage.bind(this), { noAck: false });
    } catch (error) {
      logger.error('Error connecting to RabbitMQ for consuming:', error);
      throw error;
    }
  }

  // Handle incoming messages from the queue
  private async handleMessage(msg: ConsumeMessage | null): Promise<void> {
    logger.info(`Inside Handle message`);
    const session = await mongoose.startSession();
    session.startTransaction();
    if (msg === null) {
      return;
    }
    try {
      const transaction: ITransaction = JSON.parse(msg.content.toString());
      logger.info('Received message:', transaction);
      // Process the transaction here
      
      const sourceAccountData = await Account.findById({ "_id": new ObjectId(transaction.fromAccount)},
       {"_id": 1, "balance": 1}, {session});
      const destinationAccountdata = await Account.findById({ "_id": new ObjectId(transaction.toAccount)}, 
      {"_id": 1, "balance": 1}, {session});
      
      if(!sourceAccountData || !destinationAccountdata) {
        throw new Error(`Source or destination account does not exist`);
      }
      
      logger.info(`Existing balance is ${sourceAccountData.balance}`);

      if(transaction.amount > sourceAccountData.balance) {
        throw new Error('Insufficient funds');
      }

      sourceAccountData.balance -= transaction.amount;
      await sourceAccountData.save({session});

      destinationAccountdata.balance += transaction.amount;
      await destinationAccountdata.save({ session });
      await session.commitTransaction();
      logger.info(`Transaction has completed successfully`);
      this.channel?.ack(msg); // Acknowledge the message
    } catch (error) {
      logger.error('Error processing message:', error);
      await session.abortTransaction();
      this.channel?.nack(msg, false, false); // Reject the message
      throw error;
    } finally {
      session.endSession();
    }
  }

  // Close the connection and channel
  async close(): Promise<void> {
    logger.info(`Inside closed`)
    if (this.channel) {
      await this.channel.close();
      this.channel = null;
    }
    if (this.connection) {
      await this.connection.close();
      this.connection = null;
    }
    logger.info('Disconnected from RabbitMQ consumer');
  }
}

// Create a single instance of the QueueConsumer
const consumer = new QueueConsumer(process.env.RABBITMQ_URI || 'amqp://localhost:5672');
consumer.connect().catch((error) => logger.error('Failed to connect to RabbitMQ for consuming:', error));

// Ensure graceful shutdown
process.on('exit', () => consumer.close());
process.on('SIGINT', () => consumer.close());
process.on('SIGTERM', () => consumer.close());

export default consumer;
