const Message = require("../models/Message");
const User = require("../models/User");

const list = async (req, res) => {
 try { 
  const users = await User.find();
  console.log(users);
  res.json({ message: "success", data: users });
  } catch (error) {
    console.error("Error fetching message:", error);
    res.status(500).json({ message: "Failed to fetch message", error: error });
  }
};

const user = async (req, res) => {
  try {
    const {_id} = req.params
    const user = await User.findById(_id)
    console.log(user)
    res.json({ message: "success", data: user });
  } catch (error) {
    console.error("Error fetching message:", error);
    res.status(500).json({ message: "Failed to fetch message", error: error });
  }
}

const newUser = async (req, res) => {
  try {
    const { username, birthdate } = req.body;
    if (!username || !birthdate) {
      return res.status(400).json({ message: "Username and birthdate are required." });
    }

    const newUser = await User.create({
      username: username, 
      birthdate: birthdate,
    })
    
    console.log("User added:", newUser)
    res.status(201).json({ message: "User successfully added", data: newUser });
  } catch (error) {
    console.error("Error adding User:", error);
    res.status(500).json({ message: "Failed to add User", error: error });
  }
}

module.exports = { list, user, newUser };
