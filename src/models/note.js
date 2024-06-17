// models/note.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Note = sequelize.define('Note', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false 
  },
  trashed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false 
  }
}, {
  timestamps: true
});

export default Note;
