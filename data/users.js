import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    shippingAddress: {
      shippingname: 'Admin User',
      address: 'Admin User Address',
      city: 'Admin User City',
      postalCode: '10120',
      country: 'Admin User Country',
      phone: '0993334444',
    },
    billingAddress: {
      billingName: 'dmin User',
      billinggAddress: 'Admin User Address',
      billingCity: 'Admin User City',
      billingPostalCode: '10120',
      billingCountry: 'Admin User Country',
      billingPhone: '0993334444',
      tax: '1234567890',
    },
  },
  {
    name: 'John Doe',
    email: 'john@email.com',
    password: bcrypt.hashSync('123456', 10),
    shippingAddress: {
      shippingname: 'John Doe',
      address: 'John Doe Address',
      city: 'John Doe City',
      postalCode: '10120',
      country: 'John Doe Country',
      phone: '0993334444',
    },
    billingAddress: {
      billingName: 'John Doe',
      billinggAddress: 'John Doe Address',
      billingCity: 'John Doe City',
      billingPostalCode: '10120',
      billingCountry: 'John Doe Country',
      billingPhone: '0993334444',
      tax: '1234567890',
    },
  },
  {
    name: 'Jane Doe',
    email: 'jane@email.com',
    password: bcrypt.hashSync('123456', 10),
    shippingAddress: {
      shippingname: 'Jane Doe',
      address: 'Jane Doe Address',
      city: 'Jane Doe City',
      postalCode: '10120',
      country: 'Jane Doe Country',
      phone: '0993334444',
    },
    billingAddress: {
      billingName: 'Jane Doe',
      billinggAddress: 'Jane Doe Address',
      billingCity: 'Jane Doe City',
      billingPostalCode: '10120',
      billingCountry: 'Jane Doe Country',
      billingPhone: '0993334444',
      tax: '1234567890',
    },
  },
];

export default users;
