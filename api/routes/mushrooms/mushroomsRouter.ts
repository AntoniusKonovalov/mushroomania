import express from "express"
import { addMushrooms, getMushrooms, removeMushroom, updateMushroom } from "./mushroomCont"

const router = express.Router()

router
  .get("/get-mushrooms", getMushrooms)
  .post("/add-mushroom", addMushrooms)
  .delete("/delete-mushroom/:id", removeMushroom)
  .patch("/update-mushroom/:id", updateMushroom)

export default router