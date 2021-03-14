const { v4: uuid } = require("uuid");
const { Router } = require("express");
const storage = require("../storage/placesStorage");
const authMiddleware = require("../middleware/auth.middleware")

const router = Router();

router.get("/", async (req, res, next) => {
  const list = storage.listAll()

  res.json(list);
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
router.put("raiting/:idplaces/:idplace", authMiddleware, async (req, res, next) => {
  const { body } = req;
  const idPlace = req.params["idplace"]
  const places = await storage.getById(req.params["idplaces"]);
  const place = places.places.filter((place) => +place.id === +idPlace)[0]
  place.voted.push(body.login)
  place.scores += body.rating
  place.rating = place.voted.length === 1 ? body.rating : place.scores / place.voted.length
  const newBody = await storage.update({
    ...body,
    id: req.params.id,
    idUser
  });
  console.log(newBody)

  res.json(newBody);
});


module.exports = router;
