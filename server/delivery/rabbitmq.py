import pika
import time

def consume_messages():
    try:
        # Connect to RabbitMQ using the service name as hostname
        connection = pika.BlockingConnection(
            pika.ConnectionParameters(
                host='rabbitmq',
                credentials=pika.PlainCredentials('guest', 'guest')
            )
        )
        channel = connection.channel()
        
        # Declare the same queue as the producer
        channel.queue_declare(queue='test_queue')
        
        def callback(ch, method, properties, body):
            print(f"Received message: {body.decode()}")
        
        # Start consuming messages
        channel.basic_consume(
            queue='test_queue',
            on_message_callback=callback,
            auto_ack=True
        )
        
        print('Waiting for messages. To exit press CTRL+C')
        channel.start_consuming()
        
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    consume_messages()