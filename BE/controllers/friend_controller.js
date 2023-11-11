const friend = require("../models/friend");
const user = require("../models/user");
const { ObjectId } = require("mongodb");
// const redisClient = require("../configs/redis");

exports.get_friends = async (req, res) => {
  // const getFriends = await redisClient.get("friends");
  // if (!!getFriends)
  //   return res.status(200).json({ friends: JSON.parse(getFriends) });
  const u = await user.findById(req.query.id).catch((err) => {
    return res.status(500).json({ err: err.message });
  });
  if (!u) return res.status(404).json({ error: "Not Found this user" });
  if (u.friends[0]) {
    const pageSize = 9;
    const next = req.body.next || 0;
    const new_response = u.friends.slice(next, next + pageSize);
    if (new_response[0]) {
      const friends = await user
        .find({ _id: { $in: new_response } }, { username: 1, avatar: 1 })
        .catch((err) => {
          return res.status(500).json({ err: err.message });
        });
      // redisClient.setex("friends", 1000, JSON.stringify(new_response));
      return res.status(200).json({
        first_user: next,
        last_user: next + friends.length,
        friends: friends,
      });
    }
  }
  return res.status(404).json({ message: "No friends found" });
};
exports.request_friend = async (req, res) => {
  const requester = req.body.requester_id;
  const recipient = req.body.recipient_id;
  if (recipient && requester) {
    Promise.all([
      friend.findOne(
        {
          requester: requester,
          recipient: recipient,
        },
        { _id: 1 }
      ),
      user.findOne({ _id: requester }, { friends: 1, _id: 0 }),
    ])
      .then((response) => {
        if (response[1].friends.includes(recipient))
          return res.status(200).json({ message: "You are already friend" });
        if (response[0]) {
          if (response[0].state === "REQUESTED") {
            return res.status(400).json({
              message: "Friend request already sent",
            });
          }
        }
        return Promise.all([
          friend.create({
            requester: requester,
            recipient: recipient,
            state: "REQUESTED",
          }),
          friend.create({
            requester: recipient,
            recipient: requester,
            state: "PENDING",
          }),
        ]).then(() => {
          res.status(200).json({
            message: "Invite to add friend successfully",
            requester: requester,
            recipient: recipient,
          });
        });
      })

      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }
};
exports.accept_friend = async (req, res) => {
  const requester = req.body.requester_id;
  const recipient = req.body.recipient_id;
  if (recipient && requester) {
    Promise.all([
      user.findByIdAndUpdate(requester, {
        $addToSet: { friends: recipient },
      }),
      ,
      user.findByIdAndUpdate(recipient, {
        $addToSet: { friends: requester },
      }),
      friend.findOneAndDelete({
        requester: requester,
        recipient: recipient,
      }),
      friend.findOneAndDelete({
        requester: recipient,
        recipient: requester,
      }),
    ])
      .then(() => {
        return res.status(200).json({
          message: "Friend added successfully",
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: err.message,
        });
      });
  }
};
exports.reject_friend = async (req, res) => {
  const requester = req.body.requester_id;
  const recipient = req.body.recipient_id;
  if (recipient && requester) {
    Promise.all([
      friend.findOneAndRemove({
        requester: requester,
        recipient: recipient,
      }),
      friend.findOneAndRemove({
        requester: recipient,
        recipient: requester,
      }),
    ])
      .then((response) => {
        if (response.every((e) => e === null))
          return res.status(404).json({ message: "No request was found" });
        else
          return res.status(200).json({
            message: "Friend cancelled successfully",
          });
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message,
        });
      });
  }
};
exports.delete_friend = async (req, res) => {
  const requester = req.body.requester_id;
  const recipient = req.body.recipient_id;
  if (recipient && requester) {
    return Promise.all([
      user.findOneAndUpdate(
        { _id: requester },
        {
          $pull: { friends: recipient },
        }
      ),
      user.findOneAndUpdate(
        { _id: recipient },
        {
          $pull: { friends: requester },
        }
      ),
      friend.findOneAndDelete({
        requester: requester,
        recipient: recipient,
      }),
      friend.findOneAndDelete({
        requester: recipient,
        recipient: requester,
      }),
    ])
      .then(() => {
        return res.status(200).json({
          message: "Friend deleted successfully",
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: err.message,
        });
      });
  }
};
exports.add_multi_friend = async (req, res) => {
  const userId = req.query.id;
  let frs = [];
  for (let i = 0; i <= 99; i++) {
    if (i < 10) frs.push(new ObjectId("651c3861626507bd8e86da0" + i));
    else frs.push(new ObjectId("651c3861626507bd8e86da" + i));
  }
  await user
    .findByIdAndUpdate(userId, {
      $addToSet: { friends: { $each: frs } },
    })
    .then((response) => {
      return res.status(200).json({
        message: "Friend added successfully",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
      });
    });
};
