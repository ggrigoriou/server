const Unit = require('../models/unit');

async function createUnit(unitData) {
  try {
    const newUnit = new Unit(
      unitData
    );

    await newUnit.save();

    return newUnit;

  } catch (error) {
    throw new Error(
      'Error creating unit: ' + error.message
    );
  }
}

async function getUnitById(unitId) {
  try {
    const unit = await Unit.findById(
      unitId
    );

    if (!unit)
      throw new Error(
        'Unit not found'
      );

    return unit;

  } catch (error) {
    throw new Error(
      'Error retrieving unit: ' + error.message
    );
  }
}

async function updateUnit(unitId, updateData) {
  try {
    const updatedUnit = await Unit.findByIdAndUpdate(
      unitId,
      updateData,
      { new: true }
    );

    if (!updatedUnit)
      throw new Error(
        'Unit not found for update'
      );

    return updatedUnit;

  } catch (error) {
    throw new Error(
      'Error updating unit: ' + error.message
    );
  }
}

async function deleteUnit(unitId) {
  try {
    const deletedUnit = await Unit.findByIdAndDelete(
      unitId
    );

    if (!deletedUnit)
      throw new Error(
        'Unit not found for deletion'
      );

    return deletedUnit;

  } catch (error) {
    throw new Error(
      'Error deleting unit: ' + error.message
    );
  }
}

async function getAllUnits() {
  try {
    const units = await Unit.find(
      {}
    );

    return units;

  } catch (error) {
    throw new Error(
      'Error fetching units: ' + error.message
    );
  }
}

module.exports = {
  createUnit,
  getUnitById,
  updateUnit,
  deleteUnit,
  getAllUnits
};
