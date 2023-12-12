import amqp, { Channel, Connection, ConsumeMessage } from 'amqplib';
import logger from '../logger';

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
    if (msg === null) {
      return;
    }
    try {
      const transaction = JSON.parse(msg.content.toString());
      logger.info('Received message:', transaction);
      // Process the transaction here

      this.channel?.ack(msg); // Acknowledge the message
    } catch (error) {
      logger.error('Error processing message:', error);
      this.channel?.nack(msg); // Reject the message
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
