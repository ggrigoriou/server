const Exercise = require('../models/exercise');

async function createExercise(exerciseData) {
  try {
    const newExercise = new Exercise(
      exerciseData
    );

    await newExercise.save();

    return newExercise;

  } catch (error) {
    throw new Error(
      'Error creating exercise: ' + error.message
    );
  }
}

async function getExerciseById(exerciseId) {
  try {
    const exercise = await Exercise.findById(
      exerciseId
    );

    if (!exercise)
      throw new Error('Exercise not found');

    return exercise;

  } catch (error) {
    throw new Error(
      'Error retrieving exercise: ' + error.message
    );
  }
}

async function updateExercise(exerciseId, updateData) {
  try {
    const updatedExercise = await Exercise.findByIdAndUpdate(
      exerciseId,
      updateData,
      { new: true }
    );

    if (!updatedExercise)
      throw new Error('Exercise not found for update');

    return updatedExercise;

  } catch (error) {
    throw new Error(
      'Error updating exercise: ' + error.message
    );
  }
}

async function deleteExercise(exerciseId) {
  try {
    const deletedExercise = await Exercise.findByIdAndDelete(
      exerciseId
    );

    if (!deletedExercise)
      throw new Error('Exercise not found for deletion');

    return deletedExercise;

  } catch (error) {
    throw new Error(
      'Error deleting exercise: ' + error.message
    );
  }
}

async function getExercisesByUnit(unitId) {
  try {
    const exercises = await Exercise.find({
      unit: unitId
    });

    return exercises;

  } catch (error) {
    throw new Error(
      'Error retrieving exercises for unit: ' + error.message
    );
  }
}

module.exports = {
  createExercise,
  getExerciseById,
  updateExercise,
  deleteExercise,
  getExercisesByUnit
};
