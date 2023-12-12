import amqp, { Channel, Connection } from 'amqplib';
import logger from '../logger';

const QUEUE_NAME = 'transactions';

class QueueProducer {
  private connection: Connection | null = null;
  private channel: Channel | null = null;

  constructor(private uri: string) {}

  // Establish a connection to RabbitMQ
  async connect(): Promise<void> {
    try {
      this.connection = await amqp.connect(this.uri);
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(QUEUE_NAME, { durable: true });
      logger.info('Connected to RabbitMQ');
    } catch (error) {
      logger.error('Error connecting to RabbitMQ:', error);
      throw error;
    }
  }

  // Send message to the queue
  async sendToQueue(message: Buffer): Promise<boolean> {
    if (!this.channel) {
      throw new Error('Cannot send message, channel not initialized');
    }

    return this.channel.sendToQueue(QUEUE_NAME, message, { persistent: true });
  }

  // Close the connection and channel
  async close(): Promise<void> {
    if (this.channel) {
      await this.channel.close();
      this.channel = null;
    }
    if (this.connection) {
      await this.connection.close();
      this.connection = null;
    }
    logger.info('Disconnected from RabbitMQ');
  }
}

// Create a single instance of the QueueProducer
const producer = new QueueProducer(process.env.RABBITMQ_URI || 'amqp://localhost');
producer.connect().catch((error) => logger.error('Failed to connect to RabbitMQ:', error));

export const sendToQueue = async (transaction: any) => {
  try {
    const message = Buffer.from(JSON.stringify(transaction));
    await producer.sendToQueue(message);
    logger.info('Message sent to queue');
  } catch (error) {
    logger.error('Error sending message to queue:', error);
    throw error;
  }
};

export const closeQueueConnection = () => producer.close();

// Make sure to handle process termination:
process.on('exit', closeQueueConnection);
process.on('SIGINT', closeQueueConnection);
process.on('SIGTERM', closeQueueConnection);

export default producer;
