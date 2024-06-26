import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.services';

export const newNote = async (req, res, next) => {
  try {
    const data = await NoteService.newNote(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note added successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getAllNotes = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const data = await NoteService.getAllNotes(userId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All notes fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getNote = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const data = await NoteService.getNote(userId,req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const data = await NoteService.deleteNote(userId,req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const data = await NoteService.updateNote(userId,req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Note updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const archiveNote = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { _id } = req.params;
    const data = await NoteService.archiveNote(userId, _id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note archived successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const trashNote = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { _id } = req.params;
    const data = await NoteService.trashNote(userId, _id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note trashed successfully'
    });
  } catch (error) {
    next(error);
  }
};