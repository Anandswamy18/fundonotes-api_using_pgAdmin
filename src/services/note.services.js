import Note from '../models/note.js';

export const newNote = async (body) => {
  const note = await Note.create(body);
  return note;
};

export const getAllNotes = async () => {
  const notes = await Note.findAll();
  return notes;
};

export const getNote = async (id) => {
  const note = await Note.findByPk(id);
  if (!note) {
    throw new Error('Note not found');
  }
  return note;
};

export const deleteNote = async (id) => {
  const deletedNote = await Note.destroy({ where: { id } });
  if (!deletedNote) {
    throw new Error('Note not found');
  }
  return 'Note deleted successfully';
};

export const updateNote = async (id, body) => {
  const [updatedRowsCount] = await Note.update(body, { where: { id } });
  if (updatedRowsCount === 0) {
    throw new Error('Note not found');
  }
  return 'Note updated successfully';
};

export const archiveNote = async (id) => {
  const [updatedRowsCount] = await Note.update({ archived: true }, { where: { id } });
  if (updatedRowsCount === 0) {
    throw new Error('Note not found');
  }
  return 'Note archived successfully';
};

export const trashNote = async (id) => {
  const [updatedRowsCount] = await Note.update({ trashed: true }, { where: { id } });
  if (updatedRowsCount === 0) {
    throw new Error('Note not found');
  }
  return 'Note trashed successfully';
};
