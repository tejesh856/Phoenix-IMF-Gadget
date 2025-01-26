const {
  getAllGadgets,
  createGadget,
  updateGadget,
  deleteGadget,
  triggerSelfDestruct,
} = require("../controllers/gadgetController");
const { verifyToken } = require("../middleware/auth");
const { validStatuses } = require("../Utils/gadget");
const express = require("express");
const { check, query } = require("express-validator");

const router = express.Router();
const validateCreateGadget = [
  check("name").notEmpty().withMessage("Gadget name is required"),

  check("status")
    .notEmpty()
    .withMessage("Gadget status is required")
    .isIn(validStatuses)
    .withMessage("Invalid Gadget status"),
];
const validateStatusQuery = [
  query("status")
    .optional()
    .isIn(validStatuses)
    .withMessage(`Invalid status query parameter`),
];
const validateUpdateGadget = [
  check("status")
    .optional()
    .isIn(validStatuses)
    .withMessage("Invalid Gadget status"),
];
const validateTriggerSelfDestruct = [
  check("code")
    .notEmpty()
    .withMessage("Code is required")
    .isLength({ min: 6, max: 6 })
    .withMessage("Code must be exactly 6 digits")
    .isNumeric()
    .withMessage("Code must be numeric"),
];
router.route("/").get(validateStatusQuery, verifyToken, getAllGadgets);
router.route("/").post(validateCreateGadget, verifyToken, createGadget);
router.route("/:id").patch(validateUpdateGadget, verifyToken, updateGadget);
router.route("/:id").delete(verifyToken, deleteGadget);
router
  .route("/:id/self-destruct")
  .post(validateTriggerSelfDestruct, triggerSelfDestruct);

module.exports = router;
