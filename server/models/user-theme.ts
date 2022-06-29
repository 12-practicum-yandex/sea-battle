import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserModel } from './user';
import { SiteTheme } from './site-theme';

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_theme',
})
export class UserTheme extends Model<UserTheme> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => SiteTheme)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  themeId: string;

  @Column(DataType.STRING)
  device: string;

  @ForeignKey(() => UserModel)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'owner_id',
  })
  ownerId: string;
}
