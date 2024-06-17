import Note from '../models/note.js';

export const newNote = async (body) => {
  const note = await Note.create(body);
  return note;
};

export const getAllNotes = async (userId) => {
  const notes = await Note.findAll({
    where: {
      userId
    }
  });
  return notes;
};

export const getNote = async (userId, noteId) => {
  const note = await Note.findOne({
    where: {
      userId,
      id: noteId
    }
  });
  if (!note) {
    throw new Error('Note not found');
  }
  return note;
};

export const deleteNote = async (userId, id) => {
  const deletedNote = await Note.destroy({ where: { id, userId } });
  if (!deletedNote) {
    throw new Error('Note not found');
  }
  return 'Note deleted successfully';
};

export const updateNote = async (userId, id, body) => {
  const [updatedRowsCount] = await Note.update(body, { where: { id, userId } });
  if (updatedRowsCount === 0) {
    throw new Error('Note not found');
  }
  return 'Note updated successfully';
};

export const archiveNote = async (userId, id) => {
  const [updatedRowsCount] = await Note.update({ archived: true }, { where: { id, userId } });
  if (updatedRowsCount === 0) {
    throw new Error('Note not found');
  }
  return 'Note archived successfully';
};

export const trashNote = async (userId, id) => {
  const [updatedRowsCount] = await Note.update({ trashed: true }, { where: { id, userId } });
  if (updatedRowsCount === 0) {
    throw new Error('Note not found');
  }
  return 'Note trashed successfully';
};