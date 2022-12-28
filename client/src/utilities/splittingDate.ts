export const convertToDate = (dateString:string) => {
 const date = new Date(dateString)
 return date.toISOString().substring(0, 10)
 
}

export const convertToTime = (dateString:string) => {
 const time = new Date(dateString)
 return time.toISOString().substring(11, 19)
}