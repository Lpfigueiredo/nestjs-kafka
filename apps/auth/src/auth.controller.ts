import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { GetUserRequest } from './get-user-request.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('get_user')
  getUser(data: GetUserRequest) {
    return this.authService.getUser(data);
  }
}
