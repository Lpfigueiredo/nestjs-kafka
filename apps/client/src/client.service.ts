import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateOrderRequest } from './create-order-request.dto';
import { OrderCreatedEvent } from './order-created.event';

@Injectable()
export class ClientService {
  constructor(@Inject('BILLING_SERVICE') private client: ClientKafka) {}

  getHello(): string {
    return 'Hello World!';
  }

  createOrder({ userId, price }: CreateOrderRequest) {
    this.client.emit(
      'order_created',
      new OrderCreatedEvent('123', userId, price),
    );
  }
}
