import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const QUEUE_NAME = 'temperature_alerts';

let channel = null;

const connect = async () => {
  try {
    if (channel) return channel;
    
    const connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    
    console.log('Connected to RabbitMQ');
    return channel;
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    throw error;
  }
};

export const sendTemperatureAlert = async (sensorData) => {
  try {
    if (!channel) {
      await connect();
    }
    
    const message = {
      timestamp: new Date().toISOString(),
      ...sensorData,
      message: `High temperature alert: ${sensorData.temperatura}°C`
    };
    
    await channel.sendToQueue(
      QUEUE_NAME,
      Buffer.from(JSON.stringify(message)),
      { persistent: true }
    );
    
    console.log('Sent temperature alert to RabbitMQ:', message);
  } catch (error) {
    console.error('Error sending message to RabbitMQ:', error);
    // Don't throw the error to prevent the main operation from failing
  }
};

export default {
  connect,
  sendTemperatureAlert
};
