const exerciseService = require('../services/exerciseService');

async function createExercise(req, res) {
  try {
    const exerciseData = req.body;

    const newExercise = await exerciseService.createExercise(
      exerciseData
    );

    res.status(201).json({
      exercise: newExercise
    });

  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
}

async function getExercise(req, res) {
  try {
    const exerciseId = req.params.id;

    const exercise = await exerciseService.getExerciseById(
      exerciseId
    );

    res.status(200).json({
      exercise
    });

  } catch (error) {
    res.status(404).json({
      error: error.message
    });
  }
}

async function updateExercise(req, res) {
  try {
    const exerciseId = req.params.id;
    const updateData = req.body;

    const updatedExercise = await exerciseService.updateExercise(
      exerciseId,
      updateData
    );

    res.status(200).json({
      exercise: updatedExercise
    });

  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
}

async function deleteExercise(req, res) {
  try {
    const exerciseId = req.params.id;

    const deletedExercise = await exerciseService.deleteExercise(
      exerciseId
    );

    res.status(200).json({
      exercise: deletedExercise
    });

  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
}

async function getExercisesByUnit(req, res) {
  try {
    const unitId = req.params.unitId;

    const exercises = await exerciseService.getExercisesByUnit(
      unitId
    );

    res.status(200).json({
      exercises
    });

  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
}

module.exports = {
  createExercise,
  getExercise,
  updateExercise,
  deleteExercise,
  getExercisesByUnit
};
