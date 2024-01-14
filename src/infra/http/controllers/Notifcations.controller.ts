import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotification } from 'src/application/use-cases/send-notification';
import { NotificatonViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from 'src/application/use-cases/cancel-notification';
import {
  CountRecipientNotification,
  CountRecipientNotificationResponse,
} from 'src/application/use-cases/count-recipient-notification';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private countRecipientNotifications: CountRecipientNotification,
  ) {}
  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }
  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<CountRecipientNotificationResponse> {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });
    return {
      count,
    };
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });
    return { notification: NotificatonViewModel.toHTTP(notification) };
  }
}
