const user = require("../models/user");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const properties = process.env;

exports.create_mock_phone_number = async (req, res, next) => {
  const countryCode = "+84";
  const max = 999999999;
  const min = 100000000;
  const arr = [];
  let vietnamesePhoneNumber = 0;
  for (let i = 0; i < 2000; i++) {
    vietnamesePhoneNumber =
      countryCode + (Math.floor(Math.random() * (max - min + 1)) + min);
    if (!arr.includes(vietnamesePhoneNumber)) {
      arr.push(vietnamesePhoneNumber);
    }
  }
  await user.updateMany(
    {},
    [
      {
        $set: {
          phone: {
            $arrayElemAt: [
              arr,
              {
                $round: {
                  $multiply: [
                    {
                      $rand: {},
                    },
                    arr.length - 1,
                  ],
                },
              },
            ],
          },
        },
      },
    ],
    {
      multi: true,
    }
  );
  console.log(arr);
  res.json({ message: "success" });
};
exports.create_multiple_users = async (req, res) => {
  const encryptedPassword = await bcrypt.hash("123456", properties.HASH_ROUND);
  const total_size = 1000;
  let values = [];
  for (let i = 0; i <= total_size; i++) {
    const username =
      faker.internet.userName().toLowerCase() +
      Math.floor(Math.random() * 10000);
    const data = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      username: username,
      address: faker.location.streetAddress(),
      birthday: faker.date.birthdate().toUTCString(),
      email: username + "@gmail.com",
      avatar: faker.internet.avatar(),
      gender: "female",
      phone:
        "09" + Math.floor(Math.random() * (99999999 - 10000000) + 10000000),
      password: encryptedPassword,
    };
    values.push(data);
    if (i === total_size / 100) {
      i = 0;
      await user.insertMany(values).catch((err) => {
        console.log(err.message);
      });
    }
  }
};
