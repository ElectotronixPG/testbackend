const products = [
  {
    productCode: 'PW 00001',
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    datasheet: '/images/datasheet.pdf',
    manual: '/images/manual.pdf',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: 'Electronics',
    price: 89.99,
    countInStock: 10,
    rating: 5,
    numReviews: 12,
    nameThai: 'หูฟังบลูทูธไร้สายแอร์พอดส์',
    descriptionThai:
      'เทคโนโลยีบลูทูธช่วยให้คุณเชื่อมต่อกับอุปกรณ์ที่รองรับได้แบบไร้สาย เสียงคุณภาพสูง AAC มอบประสบการณ์การฟังที่สมจริง ไมโครโฟนในตัวช่วยให้คุณรับสายได้ขณะทำงาน',
    brandThai: 'Apple',
    categoryThai: 'อิเล็กทรอนิกส์',
  },
  {
    productCode: 'PW 00002',
    name: 'iPhone 13 Pro 256GB Memory',
    image: '/images/phone.jpg',
    datasheet: '/images/datasheet.pdf',
    manual: '/images/manual.pdf',
    description:
      'Introducing the iPhone 13 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Apple',
    category: 'Electronics',
    price: 599.99,
    countInStock: 7,
    rating: 5,
    numReviews: 8,
    nameThai: 'iPhone 13 Pro ความจุ 256GB',
    descriptionThai:
      'ขอแนะนำ iPhone 13 Pro ระบบกล้องสามตัวที่เปลี่ยนแปลงไป เพิ่มความสามารถมากมายโดยไม่ซับซ้อน ก้าวกระโดดที่ไม่เคยมีมาก่อนในด้านอายุการใช้งานแบตเตอรี่',
    brandThai: 'Apple',
    categoryThai: 'อิเล็กทรอนิกส์',
  },
  {
    productCode: 'PW 00003',
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    datasheet: '/images/datasheet.pdf',
    manual: '/images/manual.pdf',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: 'Electronics',
    price: 929.99,
    countInStock: 5,
    rating: 5,
    numReviews: 12,
    nameThai: 'กล้อง DSLR Canon EOS 80D',
    descriptionThai:
      'โดดเด่นด้วยคุณสมบัติการถ่ายภาพที่หลากหลาย Canon EOS 80D ทำให้ภาพชัดเจนยิ่งขึ้นด้วยระบบโฟกัสที่ทรงพลังสองชุดและการออกแบบที่ใช้งานง่าย',
    brandThai: 'Canon',
    categoryThai: 'อิเล็กทรอนิกส์',
  },
  {
    productCode: 'PW 00004',
    name: 'Sony Playstation 5',
    image: '/images/playstation.jpg',
    datasheet: '/images/datasheet.pdf',
    manual: '/images/manual.pdf',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: 'Electronics',
    price: 399.99,
    countInStock: 11,
    rating: 5,
    numReviews: 12,
    nameThai: 'โซนี่ เพลย์สเตชัน 5',
    descriptionThai:
      'ศูนย์รวมความบันเทิงภายในบ้านที่ดีที่สุดเริ่มต้นด้วยเพลย์สเตชัน ไม่ว่าคุณจะชื่นชอบการเล่นเกม ภาพยนตร์ HD โทรทัศน์ หรือดนตรี',
    brandThai: 'Sony',
    categoryThai: 'อิเล็กทรอนิกส์',
  },
  {
    productCode: 'PW 00005',
    name: 'Logitech G-Series Gaming Mouse',
    image: '/images/mouse.jpg',
    datasheet: '/images/datasheet.pdf',
    manual: '/images/manual.pdf',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: 'Electronics2',
    price: 49.99,
    countInStock: 7,
    rating: 5,
    numReviews: 10,
    nameThai: 'เมาส์เล่นเกม Logitech G-Series',
    descriptionThai:
      'ควบคุมการเล่นเกมของคุณได้ดีขึ้นด้วยเมาส์เล่นเกม Logitech LIGHTSYNC ปุ่มที่ตั้งโปรแกรมได้หกปุ่มช่วยให้ปรับแต่งการใช้งานเพื่อประสบการณ์การเล่นที่ราบรื่น',
    brandThai: 'Logitech',
    categoryThai: 'อิเล็กทรอนิกส์2',
  },
  {
    productCode: 'PW 00006',
    name: 'Amazon Echo Dot 3rd Generation',
    image: '/images/alexa.jpg',
    datasheet: '/images/datasheet.pdf',
    manual: '/images/manual.pdf',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: 'Electronics3',
    price: 29.99,
    countInStock: 0,
    rating: 5,
    numReviews: 12,
    nameThai: 'อเมซอน เอคโค่ ดอท รุ่นที่ 3',
    descriptionThai:
      'พบกับเอคโค่ ดอท - ลำโพงอัจฉริยะที่ได้รับความนิยมมากที่สุดของเราพร้อมดีไซน์ผ้า เป็นลำโพงอัจฉริยะที่กะทัดรัดที่สุดของเราที่เหมาะกับพื้นที่ขนาดเล็กอย่างลงตัว',
    brandThai: 'Amazon',
    categoryThai: 'อิเล็กทรอนิกส์3',
  },
  {
    productCode: 'PW 00007',
    name: 'Sony Playstation 5',
    image: '/images/playstation.jpg',
    datasheet: '/images/datasheet.pdf',
    manual: '/images/manual.pdf',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: 'Electronics',
    price: 399.99,
    countInStock: 11,
    rating: 5,
    numReviews: 12,
    nameThai: 'โซนี่ เพลย์สเตชัน 5',
    descriptionThai:
      'ศูนย์รวมความบันเทิงภายในบ้านที่ดีที่สุดเริ่มต้นด้วยเพลย์สเตชัน ไม่ว่าคุณจะชื่นชอบการเล่นเกม ภาพยนตร์ HD โทรทัศน์ หรือดนตรี',
    brandThai: 'Sony',
    categoryThai: 'อิเล็กทรอนิกส์',
  },
  {
    productCode: 'PW 00008',
    name: 'Logitech G-Series Gaming Mouse',
    image: '/images/mouse.jpg',
    datasheet: '/images/datasheet.pdf',
    manual: '/images/manual.pdf',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: 'Electronics2',
    price: 49.99,
    countInStock: 7,
    rating: 5,
    numReviews: 10,
    nameThai: 'เมาส์เล่นเกม Logitech G-Series',
    descriptionThai:
      'ควบคุมการเล่นเกมของคุณได้ดีขึ้นด้วยเมาส์เล่นเกม Logitech LIGHTSYNC ปุ่มที่ตั้งโปรแกรมได้หกปุ่มช่วยให้ปรับแต่งการใช้งานเพื่อประสบการณ์การเล่นที่ราบรื่น',
    brandThai: 'Logitech',
    categoryThai: 'อิเล็กทรอนิกส์2',
  },
  {
    productCode: 'PW 00009',
    name: 'Amazon Echo Dot 3rd Generation',
    image: '/images/alexa.jpg',
    datasheet: '/images/datasheet.pdf',
    manual: '/images/manual.pdf',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: 'Electronics3',
    price: 29.99,
    countInStock: 0,
    rating: 5,
    numReviews: 12,
    nameThai: 'อเมซอน เอคโค่ ดอท รุ่นที่ 3',
    descriptionThai:
      'พบกับเอคโค่ ดอท - ลำโพงอัจฉริยะที่ได้รับความนิยมมากที่สุดของเราพร้อมดีไซน์ผ้า เป็นลำโพงอัจฉริยะที่กะทัดรัดที่สุดของเราที่เหมาะกับพื้นที่ขนาดเล็กอย่างลงตัว',
    brandThai: 'Amazon',
    categoryThai: 'อิเล็กทรอนิกส์3',
  },
];

export default products;
