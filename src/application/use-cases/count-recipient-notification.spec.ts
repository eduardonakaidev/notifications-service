import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { Notification } from '../entities/notification';
import { Content } from '../entities/content';
import { CountRecipientNotification } from './count-recipient-notification';

describe('CountRecipient notification', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifcation = new CountRecipientNotification(
      notificationsRepository,
    );

    const notification = new Notification({
      category: 'social',
      content: new Content('Nova solicitação de amizade!'),
      recipientId: 'example-recipient-id',
    });
    await notificationsRepository.create(notification);

    const { count } = await countRecipientNotifcation.execute({
      recipientId: notification.recipientId,
    });
    expect(count).toEqual(1);
  });
});
