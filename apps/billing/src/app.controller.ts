import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { OrderCreatedEvent } from './order-created.event';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
    private readonly appService: AppService,
  ) {}

  onModuleInit() {
    this.authClient.subscribeToResponseOf('get_user');
  }

  @EventPattern('order_created')
  handleOrderCreated(data: OrderCreatedEvent) {
    this.appService.handleOrderCreated(data);
  }
}
