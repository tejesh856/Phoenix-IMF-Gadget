const { validationResult } = require("express-validator");
const {
  generateCodename,
  generateConfirmationCode,
} = require("../Utils/gadget");
const createHttpError = require("http-errors");
const Gadget = require("../db/models/gadget");
const User = require("../db/models/user");

//get list of gadgets based on status GET /gadgets?status={status}
const getAllGadgets = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const groupedErrors = errors.array().reduce((acc, error) => {
      if (!acc[error.path]) {
        acc[error.path] = [];
      }
      acc[error.path].push(error.msg);
      return acc;
    }, {});

    return res.status(400).json({ success: false, errors: groupedErrors });
  }
  try {
    const { status } = req.query;
    const { id } = req.payload;

    const whereClause = status ? { status, createdBy: id } : { createdBy: id };
    const gadgets = await Gadget.findAll({ where: whereClause });
    // Add a randomly generated mission success probability to each gadget
    const gadgetsWithSuccessProbability = gadgets.map((gadget) => ({
      ...gadget.toJSON(),
      missionSuccessProbability: `${Math.floor(Math.random() * 21) + 10}%`, // Random value between 10% and 100%
    }));
    res
      .status(200)
      .json({ success: true, data: gadgetsWithSuccessProbability });
  } catch (error) {
    next(error);
  }
};

//create new gadget
const createGadget = async (req, res, next) => {
  //validating fields
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const groupedErrors = errors.array().reduce((acc, error) => {
      if (!acc[error.path]) {
        acc[error.path] = [];
      }
      acc[error.path].push(error.msg);
      return acc;
    }, {});

    return res.status(400).json({ success: false, errors: groupedErrors });
  }
  try {
    const { name, status } = req.body;
    const { id } = req.payload;

    //No Same gadget name should exist for one user
    const gadget = await Gadget.findOne({ where: { name, createdBy: id } });
    if (gadget) {
      throw createHttpError(
        401,
        "Gadget with this name already exist. Please try again."
      );
    }

    // Generate a unique codename
    const codename = generateCodename();

    // Create new gadget in the database
    const newGadget = await Gadget.create({
      name,
      status,
      codename,
      createdBy: id,
    });
    if (!newGadget) {
      throw createHttpError(
        500,
        "Failed to Create New Gadget. Please try again."
      );
    }

    res.status(201).json({
      success: true,
      message: "Gadget successfully created",
      data: newGadget,
    });
  } catch (error) {
    next(error);
  }
};

//update an existing Gadget
const updateGadget = async (req, res, next) => {
  //validating fields
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const groupedErrors = errors.array().reduce((acc, error) => {
      if (!acc[error.path]) {
        acc[error.path] = [];
      }
      acc[error.path].push(error.msg);
      return acc;
    }, {});

    return res.status(400).json({ success: false, errors: groupedErrors });
  }
  try {
    const { id } = req.params;
    const { name, status } = req.body;
    const { id: userId } = req.payload;
    // If neither name nor status is provided, return an error
    if (!name && !status) {
      throw createHttpError(
        400,
        "At least one field (name or status) must be provided for update."
      );
    }

    //find existing gadget
    const gadget = await Gadget.findOne({ where: { id, createdBy: userId } });
    if (!gadget) {
      throw createHttpError(
        404,
        "Gadget not found or does not belong to the user"
      );
    }

    // Update the gadget fields if provided
    if (name) gadget.name = name;
    if (status) gadget.status = status;

    await gadget.save();

    res.status(200).json({
      success: true,
      message: "Gadget updated successfully",
      data: gadget,
    });
  } catch (error) {
    next(error);
  }
};

//delete an existing gadget mark as decommissioned

const deleteGadget = async (req, res, next) => {
  //validating fields
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const groupedErrors = errors.array().reduce((acc, error) => {
      if (!acc[error.path]) {
        acc[error.path] = [];
      }
      acc[error.path].push(error.msg);
      return acc;
    }, {});

    return res.status(400).json({ success: false, errors: groupedErrors });
  }
  try {
    const { id } = req.params;
    const { id: userId } = req.payload;

    //find existing gadget
    const gadget = await Gadget.findOne({ where: { id, createdBy: userId } });
    if (!gadget) {
      throw createHttpError(
        404,
        "Gadget not found or does not belong to the user"
      );
    }
    // Check if the gadget has already been decommissioned
    if (gadget.status === "Decommissioned") {
      throw createHttpError(400, "This gadget has already been decommissioned");
    }

    // Mark gadget as decommissioned and add decommissioned timestamp
    gadget.status = "Decommissioned";
    gadget.deletedAt = new Date();

    // Save the deleted gadget
    await gadget.save();

    res.status(200).json({
      success: true,
      message: "Gadget has been decommissioned successfully",
    });
  } catch (error) {
    next(error);
  }
};

// POST: Trigger self-destruct for a specific gadget
const triggerSelfDestruct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const groupedErrors = errors.array().reduce((acc, error) => {
      if (!acc[error.path]) {
        acc[error.path] = [];
      }
      acc[error.path].push(error.msg);
      return acc;
    }, {});

    return res.status(400).json({ success: false, errors: groupedErrors });
  }

  try {
    const { id } = req.params;
    const { code } = req.body;

    // Fetch the gadget from the database
    const gadget = await Gadget.findByPk(id);
    if (!gadget) {
      throw createHttpError(404, "Gadget not found");
    }

    // Simulate a previously generated confirmation code (in a real-world scenario,
    // you'd send this to the user's email/phone, etc.)
    const storedConfirmationCode = generateConfirmationCode();
    console.log(storedConfirmationCode);

    // If the provided confirmation code doesn't match the generated one, throw an error
    if (code !== storedConfirmationCode) {
      throw createHttpError(400, "Invalid confirmation code");
    }

    // Mark the gadget as destroyed (or decommissioned)
    gadget.status = "Destroyed";
    gadget.deletedAt = new Date();

    // Save the gadget to the database
    await gadget.save();

    res.status(200).json({
      success: true,
      message: "Gadget self-destruct sequence triggered successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllGadgets,
  createGadget,
  updateGadget,
  deleteGadget,
  triggerSelfDestruct,
};
