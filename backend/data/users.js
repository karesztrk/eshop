import brypt from 'bcryptjs';

const user = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: brypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: brypt.hashSync('123456', 10),
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: brypt.hashSync('123456', 10),
  },
];

export default user;
