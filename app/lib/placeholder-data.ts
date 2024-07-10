// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
// const users = [
//   {
//     id: '410544b2-4001-4271-9855-fec4b6a6442a',
//     name: 'User',
//     email: 'user@nextmail.com',
//     password: '123456',
//     image_url: '/customers/evil-rabbit.png',
//   },
// ];

const following = [
  {
    id: '5f0c7fb6-8e16-435d-b9f0-cc6e5f4c7555',
    followed: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    follower: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
  },
  {
    id: '363bf8b6-ef5a-40c4-a90e-d1f58b6a0cf6',
    followed: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    follower: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
  },
  {
    id: '3787caa0-6c52-4cbb-82e0-0b127ad99a57',
    followed: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    follower: '76d65c26-f784-44a2-ac19-586678f7c2f2',
  },
  {
    id: 'd3928082-092f-4d16-876b-c093e6dc2804',
    followed: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    follower: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    
  },
  {
    id: '493029bb-a591-4bba-ac16-e3a6d2bbdcb9',
    followed: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    follower: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    
  },
  {
    id: 'af745d30-42bd-44d5-b898-d4c7dab5dceb',
    followed: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    follower: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
  },
]

const users = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    password: '123456',
    image_url: '/customers/evil-rabbit.png',
    tokens: 20,
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    password: '123456',
    image_url: '/customers/delba-de-oliveira.png',
    tokens: 25,
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    password: '123456',
    image_url: '/customers/lee-robinson.png',
    tokens: 20,
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    password: '123456',
    image_url: '/customers/michael-novotny.png',
    tokens: 25,
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    password: '123456',
    image_url: '/customers/amy-burns.png',
    tokens: 20,
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    password: '123456',
    image_url: '/customers/balazs-orban.png',
    tokens: 25,
  },
];

const posts = [
  {
    customer_id: users[0].id,
    tips: 248,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Quis enim lobortis scelerisque fermentum dui faucibus. Nunc id cursus metus aliquam. Gravida cum sociis natoque penatibus et. Odio ut sem nulla pharetra diam. Tincidunt ornare massa eget egestas purus viverra accumsan in nisl. Laoreet sit amet cursus sit amet. In fermentum et sollicitudin ac orci phasellus egestas. Lorem ipsum dolor sit amet consectetur adipiscing.',
    date: '2022-12-06',
  },
  {
    customer_id: users[1].id,
    tips: 20348,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Quis enim lobortis scelerisque fermentum dui faucibus. Nunc id cursus metus aliquam. Gravida cum sociis natoque penatibus et. Odio ut sem nulla pharetra diam. Tincidunt ornare massa eget egestas purus viverra accumsan in nisl. Laoreet sit amet cursus sit amet. In fermentum et sollicitudin ac orci phasellus egestas. Lorem ipsum dolor sit amet consectetur adipiscing.',
    date: '2022-11-14',
  },
  {
    customer_id: users[4].id,
    tips: 3040,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Quis enim lobortis scelerisque fermentum dui faucibus. Nunc id cursus metus aliquam. Gravida cum sociis natoque penatibus et. Odio ut sem nulla pharetra diam. Tincidunt ornare massa eget egestas purus viverra accumsan in nisl. Laoreet sit amet cursus sit amet. In fermentum et sollicitudin ac orci phasellus egestas. Lorem ipsum dolor sit amet consectetur adipiscing.',
    date: '2022-10-29',
  },
  {
    customer_id: users[3].id,
    tips: 44800,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Quis enim lobortis scelerisque fermentum dui faucibus. Nunc id cursus metus aliquam. Gravida cum sociis natoque penatibus et. Odio ut sem nulla pharetra diam. Tincidunt ornare massa eget egestas purus viverra accumsan in nisl. Laoreet sit amet cursus sit amet. In fermentum et sollicitudin ac orci phasellus egestas. Lorem ipsum dolor sit amet consectetur adipiscing.',
    date: '2023-09-10',
  },
  {
    customer_id: users[5].id,
    tips: 34577,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Quis enim lobortis scelerisque fermentum dui faucibus. Nunc id cursus metus aliquam. Gravida cum sociis natoque penatibus et. Odio ut sem nulla pharetra diam. Tincidunt ornare massa eget egestas purus viverra accumsan in nisl. Laoreet sit amet cursus sit amet. In fermentum et sollicitudin ac orci phasellus egestas. Lorem ipsum dolor sit amet consectetur adipiscing.',
    date: '2023-08-05',
  },
  {
    customer_id: users[2].id,
    tips: 54246,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Quis enim lobortis scelerisque fermentum dui faucibus. Nunc id cursus metus aliquam. Gravida cum sociis natoque penatibus et. Odio ut sem nulla pharetra diam. Tincidunt ornare massa eget egestas purus viverra accumsan in nisl. Laoreet sit amet cursus sit amet. In fermentum et sollicitudin ac orci phasellus egestas. Lorem ipsum dolor sit amet consectetur adipiscing.',
    date: '2023-07-16',
  },
  {
    customer_id: users[0].id,
    tips: 666,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Quis enim lobortis scelerisque fermentum dui faucibus. Nunc id cursus metus aliquam. Gravida cum sociis natoque penatibus et. Odio ut sem nulla pharetra diam. Tincidunt ornare massa eget egestas purus viverra accumsan in nisl. Laoreet sit amet cursus sit amet. In fermentum et sollicitudin ac orci phasellus egestas. Lorem ipsum dolor sit amet consectetur adipiscing.',
    date: '2023-06-27',
  },
  {
    customer_id: users[3].id,
    tips: 32545,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Quis enim lobortis scelerisque fermentum dui faucibus. Nunc id cursus metus aliquam. Gravida cum sociis natoque penatibus et. Odio ut sem nulla pharetra diam. Tincidunt ornare massa eget egestas purus viverra accumsan in nisl. Laoreet sit amet cursus sit amet. In fermentum et sollicitudin ac orci phasellus egestas. Lorem ipsum dolor sit amet consectetur adipiscing.',
    date: '2023-06-09',
  },
  {
    customer_id: users[4].id,
    tips: 1250,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Quis enim lobortis scelerisque fermentum dui faucibus. Nunc id cursus metus aliquam. Gravida cum sociis natoque penatibus et. Odio ut sem nulla pharetra diam. Tincidunt ornare massa eget egestas purus viverra accumsan in nisl. Laoreet sit amet cursus sit amet. In fermentum et sollicitudin ac orci phasellus egestas. Lorem ipsum dolor sit amet consectetur adipiscing.',
    date: '2023-06-17',
  },
  {
    customer_id: users[5].id,
    tips: 8546,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Quis enim lobortis scelerisque fermentum dui faucibus. Nunc id cursus metus aliquam. Gravida cum sociis natoque penatibus et. Odio ut sem nulla pharetra diam. Tincidunt ornare massa eget egestas purus viverra accumsan in nisl. Laoreet sit amet cursus sit amet. In fermentum et sollicitudin ac orci phasellus egestas. Lorem ipsum dolor sit amet consectetur adipiscing.',
    date: '2023-06-07',
  },
  {
    customer_id: users[1].id,
    tips: 500,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Quis enim lobortis scelerisque fermentum dui faucibus. Nunc id cursus metus aliquam. Gravida cum sociis natoque penatibus et. Odio ut sem nulla pharetra diam. Tincidunt ornare massa eget egestas purus viverra accumsan in nisl. Laoreet sit amet cursus sit amet. In fermentum et sollicitudin ac orci phasellus egestas. Lorem ipsum dolor sit amet consectetur adipiscing.',
    date: '2023-08-19',
  },
  {
    customer_id: users[5].id,
    tips: 8945,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Quis enim lobortis scelerisque fermentum dui faucibus. Nunc id cursus metus aliquam. Gravida cum sociis natoque penatibus et. Odio ut sem nulla pharetra diam. Tincidunt ornare massa eget egestas purus viverra accumsan in nisl. Laoreet sit amet cursus sit amet. In fermentum et sollicitudin ac orci phasellus egestas. Lorem ipsum dolor sit amet consectetur adipiscing.',
    date: '2023-06-03',
  },
  {
    customer_id: users[2].id,
    tips: 1000,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Quis enim lobortis scelerisque fermentum dui faucibus. Nunc id cursus metus aliquam. Gravida cum sociis natoque penatibus et. Odio ut sem nulla pharetra diam. Tincidunt ornare massa eget egestas purus viverra accumsan in nisl. Laoreet sit amet cursus sit amet. In fermentum et sollicitudin ac orci phasellus egestas. Lorem ipsum dolor sit amet consectetur adipiscing.',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

export { users, posts, revenue, following };
