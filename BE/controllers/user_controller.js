const user = require("../models/user");
const redisClient = require("../configs/redis");

exports.get_users = async (req, res) => {
  let page = parseInt(req.query.page) || 0;
  let pageSize = 50;
  // if (values) {
  //   return res.status(200).json(JSON.parse(values));
  // }
  if (page < 0) {
    page = 1;
  }
  try {
    //cursor pagination
    // let hasNext, hasPrev, lastUser, firstUser;
    // const users = await user
    //   .find()
    //   .limit(pageSize);
    // if (users) {
    //   firstUser = users[0]._id;
    //   lastUser = users[users.length - 1]._id;
    //   console.log("firstUser: " + firstUser);
    //   console.log("lastUser: " + lastUser);
    //   const getUserNextPage = { _id: { $gt: lastUser } };
    //   const checkExistsNextPage = await user.findOne(getUserNextPage);
    //   if (checkExistsNextPage) hasNext = true;
    //   getUserNextPage._id = { $lt: firstUser };
    //   hasPrev = !!(await user.findOne(getUserNextPage));
    //   console.log("hasPrev: " + hasPrev);
    //   console.log("hasNext: " + hasNext);
    //   const response = {
    //     users,
    //   };
    //   if (hasNext) {
    //     response.next_cursor = `${lastUser}`;
    //   }
    //   if (hasPrev) {
    //     response.previous_cursor = `${firstUser}`;
    //   }
    //   // await redisClient.set("users", JSON.stringify(users));
    //   return res.status(200).json({
    //     count: users.length,
    //     page: parseInt(page),
    //     pageSize: parseInt(pageSize),
    //     response: response,
    //   });
    // }
    // const getUsers = await redisClient.get(page);
    // if (getUsers) return res.status(200).json(JSON.parse(getUsers));
    await user
      .find(
        {},
        {
          firstName: 1,
          lastName: 1,
          username: 1,
          email: 1,
          avatar: 1,
          gender: 1,
          phone: 1,
        }
      )
      .skip(page * pageSize)
      .limit(pageSize)
      .then((data) => {
        if (data) {
          const response = {
            // total_page: parseInt(data[0]),
            // page: parseInt(page),
            // pageSize: pageSize,
            users: data,
          };
          // if (!getUsers) redisClient.setex(page, 300, JSON.stringify(data));
          return res.status(200).json(response);
        }
        return res.status(404).json({ message: "No users found." });
      });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.get_user_by_id = async (req, res) => {
  try {
    const u = await user.findById(req.params.id);
    if (!u) return res.status(404).json({ message: "No users found." });
    return res.status(200).json({ user: u });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.get_user_by_username = async (req, res) => {
  try {
    const u = await user.findOne(
      { username: req.params.username },
      { username: 1, avatar: 1 }
    );
    if (!u) return res.status(404).json({ message: "No users found" });
    return res.status(200).json(u);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
