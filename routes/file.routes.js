const { v4: uuid } = require("uuid");
const { Router } = require("express");
const storage = require("../storage/mongo");
const authMiddleware = require("../middleware/auth.middleware")

const router = Router();

router.get("/", async (req, res, next) => {
  const list = await storage.listAll()
  console.log(list)
  res.json(list[0]);
});

router.get("/:id", async (req, res, next) => {
  const item = await storage.getById(req.params["id"]);
  console.log(req.query)
  res.status(item ? 200 : 404).json(
    item ? item : {
      statusCode: 404,
    }
  );
});

router.post("/", async (req, res, next) => {

  const id = uuid();
  const { body } = req;
  body.id = id;
  console.log(body)
  const newBody = await storage.create(body);
  console.log(newBody)


  res.json(newBody);
});

module.exports = router;
