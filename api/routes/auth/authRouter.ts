import express from 'express'
import { addUser, loginUser, logoutUser, updateUser } from './authCont'

const router = express.Router()

router
  .post("/add-user", addUser)
  .post("/login-user", loginUser)
  .post("/logout-user", logoutUser)
  .put("/update-user", updateUser)

export default router