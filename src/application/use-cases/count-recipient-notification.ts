import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification-repository';

interface CountRecipientNotificationRequest {
  recipientId: string;
}
export interface CountRecipientNotificationResponse {
  count: number;
}
@Injectable()
export class CountRecipientNotification {
  constructor(private notificationsRepository: NotificationRepository) {}
  async execute(
    request: CountRecipientNotificationRequest,
  ): Promise<CountRecipientNotificationResponse> {
    const { recipientId } = request;
    const count =
      await this.notificationsRepository.countManyByRecipientId(recipientId);
    return {
      count,
    };
  }
}
