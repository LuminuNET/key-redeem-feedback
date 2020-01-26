import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../middleware/sequelize';

class SampleModel extends Model {}

SampleModel.init(
  {
    betaKey: {
      type: DataTypes.STRING(8),
      unique: true,
      primaryKey: true,
      allowNull: false,
      field: 'beta_key',
    },
    usedBy: {
      type: DataTypes.STRING(36),
      allowNull: false,
      field: 'used_by',
    },
  },
  { sequelize, timestamps: false, modelName: 'beta_keys' }
);

export { SampleModel };
