import { db } from "../../db";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
const { OAuth2Client } = require("google-auth-library");

const verifyGoogleToken = async(token:any) => {
  const GOOGLE_CLIENT_ID = process.env.clientId
  const client = new OAuth2Client(GOOGLE_CLIENT_ID)
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    })
    return { payload: ticket.getPayload() }
  } catch (error) {
    console.error(error)
    return { error: "Invalid user detected. Please try again" }
  }
}

export const addUser = async (req, res) => {
  try {
    let { credential, first_name, email, password } = req.body

    if(credential) {
      const verificationResponse = await verifyGoogleToken(credential)
      first_name = verificationResponse.payload.given_name
      email = verificationResponse.payload.email
      password = '0'
    }

    // Check if the user Exists
    const q = ` SELECT * FROM users WHERE email = ? `

    db.query(q, email, (err, data) => {
      if (err) return res.send({ err });
      if (data.length) return res.status(409).json("User already exists")

      //Hash the password and create a user
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

      let role = 'User'
      if(first_name === 'admin' && email==='admin@gmail.com' && password==='admin') {
        role = 'Admin'
      }
      const q ="INSERT INTO USERS(`first_name`, `email`, `password`, `role`) VALUES (?)"
      
      const values = 
            [
              first_name,
              email,
              hash,
              role
            ]

      db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        const user_id = data.insertId
        console.log('this is data', data)
        const q = ` SELECT * FROM users WHERE email = '${email}' `
        db.query(q, (err, data) => {
          console.log(data)

          if (err) return res.send({ err })
          const { password, ...other } = data[0]
          const token = jwt.sign({ user_id: data[0].user_id }, 
            process.env.JWT_KEY, {
              expiresIn: '30d',
            })
          res.cookie("access_token", token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000 
          }).status(200).json(other)
        })
      })
    })

  } catch (error) {
    console.error(error.message)
    res.send({ error })

  }
}

export const loginUser = async (req, res) => {
  try {
    let { credential, email, userPassword } = req.body

    
    if(credential) {
      const verificationResponse = await verifyGoogleToken(credential)
      email = verificationResponse.payload.email
    }

    // Check if user exists
    const q = `SELECT * FROM users WHERE email = ?`

    db.query(q, email, (err, data) => {
      if (err) return res.send({ err })
      if (data.length === 0) {
        return res.status(401).json('User does not exists')
      }
      
      // Verify registered user through password provided on Sign up page and creating jwt cookie  
      if(!credential) {
        const isPasswordCorrect = bcrypt.compareSync(userPassword, data[0].password)
        if (!isPasswordCorrect) {
          return res.status(401).json('Password not valid')
        }
      }
        const { password, ...other } = data[0]
        const token = jwt.sign({ user_id: data[0].user_id }, 
          process.env.JWT_KEY, {
            expiresIn: '30d',
          })
        res.cookie("access_token", token, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
          sameSite : "none",
          secure: true,
        }).status(200).json(other)  
    })

  } catch (error) {
    console.error(error)
  }
}

export const updateUser = async (req, res) => {
  try {

    const { userId, name, email } = req.body
    const q = `UPDATE mushroom_schema.users SET first_name = '${name}', email = '${email}' WHERE user_id = ${userId}`
    db.query(q, (err, data) => {

      if (err) return res.send({ err })

      const q = ` SELECT * FROM users WHERE user_id = ${userId} `
      db.query(q, (err, data) => {
        if (err) return res.send({ err })
        const { password, ...other } = data[0]
        const token = jwt.sign({ user_id: data[0].user_id }, process.env.JWT_KEY)
        res.cookie("access_token", token, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000
        }).status(200).json(other)
      })
    })

  } catch (error) {
    console.error(error)
  }
}

export const logoutUser = async (req, res) => {
  try {
    const userId = req.body
    console.log(userId)
   const q = ` SELECT * FROM users WHERE user_id = '${userId}'`;
    db.query(q, (err, data) => {
      if (err) return res.send({ err })
      res.clearCookie("access_token", {
        sameSite:"none",
        secure:true
      }).status(200).json("User has been logged out")
    })

  } catch (error) {
    console.error(error.message)
    res.send({ error })

  }
}