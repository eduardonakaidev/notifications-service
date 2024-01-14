import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateNotificationBody {
  @IsNotEmpty()
  //recipientId is not empty
  @IsUUID()
  recipientId: string;
  @IsNotEmpty()
  //content is not empty
  @Length(5, 240)
  //min length is 5 and max is 240 chars
  content: string;
  @IsNotEmpty()
  //category is not empty
  category: string;
}
