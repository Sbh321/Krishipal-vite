import bycrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@gmail.com",
    password: bycrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Subham Bhandari",
    email: "subham@gmail.com",
    password: bycrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Utsav Karki",
    email: "utsav@gmail.com",
    password: bycrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

export default users;
