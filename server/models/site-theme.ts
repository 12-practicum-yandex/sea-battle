import {
  AutoIncrement,
  Model,
  Table,
  PrimaryKey,
  Column,
  AllowNull,
  Unique,
  DataType,
  Index,
} from 'sequelize-typescript';

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'site_theme',
})
export class SiteTheme extends Model<SiteTheme> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Index
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  theme: string;
}
