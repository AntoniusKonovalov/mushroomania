import { db } from "../../db"
const mysql = require('mysql')
const cloudinary = require('../../utils/cloudinary')

export const getMushrooms = async (req, res) => {
  try {
    const q = req.query.cat
      ? "SELECT * FROM mushroom_schema.mushrooms WHERE cat = ?"
      : "SELECT * FROM mushroom_schema.mushrooms"

    db.query(q, [req.query.cat], (err, data) => {
      if (err) return res.send(err);

      return res.status(200).json(data);
    })

  } catch (error) {
    console.error(error)
  }
}

export const addMushrooms = async (req, res) => {
  try {
    const { name, price, image, cat, description } = req.body

    let picture = null
    if(image != null) {
      const result = await cloudinary.uploader.upload(image, {
        folder: 'products',
      }) 
      picture = result.secure_url
    }
 
    const q = "INSERT INTO MUSHROOMS (`name`, `price`, `image`, `cat`, `description`) VALUES (?)"

    const values = [
      mysql.escape(name), 
      price,
      picture,
      cat,
      mysql.escape(description)
    ]

     db.query(q, [values], (err, data) => {
      if(err) return res.json(err)
      console.log(data)

      const q =  "SELECT * FROM mushroom_schema.mushrooms"
       db.query(q, (err, data) => {
        if(err) return res.json(err)
        res.send(data)
      })
    })

  } catch (error) {
    console.error(error.message)
    res.send({ error })
  }
}

export const updateMushroom = async (req, res) => {
  try {
    const mushroomId = req.params.id
    const { name, price, description, image, cat } = req.body
    console.log(mushroomId)
    // console.log(name, price, description, image, cat)

    const result = await cloudinary.uploader.upload(image, {
      folder: 'products',
    })
    const imageCloudinary = result.secure_url
    
    const q = 
    ` UPDATE mushroom_schema.mushrooms
      SET name = ${mysql.escape(name)}, price = '${price}', description = ${mysql.escape(description)}, image = '${imageCloudinary}', cat = '${cat}'
      WHERE mushroom_id = ${mushroomId}
    `

    db.query(q, (err, data) => {
      if(err) return res.json(err)
      console.log(data)

      const q =  "SELECT * FROM mushroom_schema.mushrooms"
       db.query(q, (err, data) => {
        if(err) return res.json(err)
        res.send(data)
      })
    })

  } catch (error) {
    console.error(error.message)
    res.send({ error })
  }
}

export const removeMushroom = async (req, res) => {
  try {
    const mushroomId = req.params.id
    const q = `DELETE FROM mushroom_schema.mushrooms WHERE mushroom_id = ${mysql.escape(mushroomId)}`

    db.query(q, (err, data) => {
      if(err) return res.json(err)
      console.log(data)

      const q =  "SELECT * FROM mushroom_schema.mushrooms"
       db.query(q, (err, data) => {
        if(err) return res.json(err)
        res.send(data)
      })
    })

  } catch (error) {
    console.error(error.message)
    res.send({ error })
  }
}
