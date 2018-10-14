export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  address: string,
  phone: string
}

export interface FlattenUsers{
  [id: string]: {
    id: number,
    name: string,
    username: string,
    email: string,
    address: string,
    phone: string
  }
}