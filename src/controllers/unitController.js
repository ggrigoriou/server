const unitService = require('../services/unitService');

async function createUnit(req, res) {
  try {
    const unitData = req.body;

    const newUnit = await unitService.createUnit(
      unitData
    );

    res.status(201).json({
      unit: newUnit
    });

  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
}

async function getUnit(req, res) {
  try {
    const unitId = req.params.id;

    const unit = await unitService.getUnitById(
      unitId
    );

    res.status(200).json({
      unit
    });

  } catch (error) {
    res.status(404).json({
      error: error.message
    });
  }
}

async function updateUnit(req, res) {
  try {
    const unitId = req.params.id;
    const updateData = req.body;

    const updatedUnit = await unitService.updateUnit(
      unitId,
      updateData
    );

    res.status(200).json({
      unit: updatedUnit
    });

  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
}

async function deleteUnit(req, res) {
  try {
    const unitId = req.params.id;

    const deletedUnit = await unitService.deleteUnit(
      unitId
    );

    res.status(200).json({
      unit: deletedUnit
    });

  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
}

async function getAllUnits(req, res) {
  try {
    const units = await unitService.getAllUnits();

    res.status(200).json({
      units
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}

module.exports = {
  createUnit,
  getUnit,
  updateUnit,
  deleteUnit,
  getAllUnits
};
