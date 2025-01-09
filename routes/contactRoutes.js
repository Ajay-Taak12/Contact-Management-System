const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();
const {
  getContacts,
  createContacts,
  updateContacts,
  deleteContacts,
  getContactsById,
} = require("../controller/contactController");

router.use(validateToken);
router.route("/").get(getContacts).post(createContacts);

router
  .route("/:id")
  .get(getContactsById)
  .put(updateContacts)
  .delete(deleteContacts);

module.exports = router;
