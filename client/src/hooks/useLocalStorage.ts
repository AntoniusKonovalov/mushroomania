import { useEffect, useState } from "react"


export const useLocalStorage = (key:any, initialValue: any) => {
  const [value, setValue] = useState(() => {
    const arrayValue = localStorage.getItem(key)
    if(arrayValue != null) return arrayValue

    if(typeof initialValue === "function") {
      return initialValue()
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(key, value)
  }, [key,value])

  return [value, setValue] as [typeof value , typeof setValue]
}
 