import { db } from "../../db"
import jwt from "jsonwebtoken"

export const addProduct = async (req, res) => {
  try {
    const { userId, mushroomId, qty } = req.body
    console.log(userId, mushroomId, qty)

    const q = "INSERT INTO ORDERS(`user_id`, `mushroom_id`, `quantity`) VALUES (?)"
    const values = [
      userId,
      mushroomId,
      qty,
    ]

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err)
      const q = " SELECT * FROM orders ORDER BY `order_id` DESC LIMIT 1 "
      db.query(q, (err, data) => {
        if (err) return res.send({ err })
        const orderNum = data[0].order_id

        const q = ` UPDATE orders SET order_date = NOW() WHERE user_id = '${userId}' AND mushroom_id = '${mushroomId}' AND order_id = '${orderNum}'`
        
        db.query(q, (err, data) => {
          console.log('this is update section')
          if(err) return res.send({ err })

          const q = ` SELECT * FROM orders WHERE user_id = '${userId}'  `
          db.query(q, (err, data) => {
            if(err) return res.send({ err })
            console.log(data)
          })
        })
      })
    })

  } catch (error) {
    console.error(error)
    res.send({ error })
  }
}

export const addOrders = async(req, res) => {
  console.log(req.body)
  const orders = req.body
  console.log(orders)

  const token = req.cookies.access_token
  if(!token) return res.status(401).json("Not authenticated!")

  const userId = jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
    if(err) return res.status(403).json("Token is not valid")

    return userInfo.user_id
  })
  
  let sql = orders.map((order:any) => `(${userId}, ${order.mushroom_id}, ${order.quantity} , 'Paid', NOW())`)
  const finalQuery = "INSERT INTO ORDERS (user_id, mushroom_id, quantity, status, order_date) VALUES" + sql
  console.log('this is sql', sql)
  db.query(finalQuery, (error, results) => {
    if (error) {
      console.log(error)
      // handle error
    } else {
      
      const q = ` SELECT * FROM orders WHERE user_id = '${userId}'  `
      db.query(q, (err, data) => {
        if(err) return res.send({ err })
        res.send(data)
      })
    }
  });

}

export const getPaidOrders = (req, res) => {
  try {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authenticated!")
  
    const userId = jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
      if(err) return res.status(403).json("Token is not valid")
      return userInfo.user_id
    })

    const q = ` SELECT * FROM orders WHERE user_id = '${userId}'  `
    db.query(q, (err, data) => {
      if(err) return res.send({ err })
      res.send(data)
    })

  } catch (error) {
    console.error(error)
  }
}