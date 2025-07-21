const { tryEach } = require("async");
const mongoose = require("mongoose");

// ✅ Connect to MongoDB using Mongoose
mongoose
  .connect(
    "mongodb+srv://username:password@cluster0.00yyznt.mongodb.net/"
  )
  .then(() => console.log("database connected successfully"))
  .catch((e) => console.log(e));

// ✅ Create a schema (defines structure of documents)
const userSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  age: Number,
  isActive: Boolean,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

// ✅ Create a model (collection wrapper)
const user = mongoose.model("User", userSchema);

async function runQueryExample() {
  try {
    // ✅ Method 1 to create a new document using .create()
    const newUser1 = await user.create({
      Name: "updated user",
      Email: "updated801@gmail.com",
      age: 30, // ✅ best practice to keep age as number
      isActive: false,
      tags: ["developer", "designer"],
    });

    // ✅ Method 2 to create a new document using new model + .save()
    const newUser2 = new user({
      Name: "raj",
      Email: "raj880@gmail.com",
      age: 28,
      isActive: true,
      tags: ["developer", "designer"],
    });
    await newUser2.save();

    // ❌ Error: here you're using undefined variable 'newUser' instead of newUser1 or newUser2
    // So let's use newUser1 for consistency
    console.log("Created new user", newUser1);

    // ✅ Find all users (no filter)
    const allUsers = await user.find({});
    console.log(allUsers);

    // ✅ Find users where isActive is true
    const getUserofActiveFalse = await user.find({ isActive: true });
    console.log(getUserofActiveFalse);

    // ✅ Find first user with Name: "John"
    const getJohn = await user.findOne({ Name: "John" });
    console.log(getJohn); // ❌ you wrote console.log(user) by mistake

    // ✅ Find user by specific ID (replace ID with actual document _id)
    const getLastcreateduser = await user.findById("687e5da9529a637f21eeaf4c");
    console.log(getLastcreateduser);

    // ✅ Return only selected fields (Name and Email), excluding _id
    const selectedField = await user.find().select("Name Email -_id");
    console.log(selectedField);

    // ✅ Pagination: skip 1 document and return next 5
    const limitedUser = await user.find().limit(5).skip(1);
    console.log(limitedUser);

    // ✅ Sort users by age in ascending order (1 = ascending, -1 = descending)
    const sortedUser = await user.find().sort({ age: 1 });
    console.log(sortedUser);

    // ✅ Count number of users where isActive is false
    const countDocument = await user.countDocuments({ isActive: false });
    console.log(countDocument);

    // ✅ Delete user by ID
    const deletedUser = await user.findByIdAndDelete(newUser1._id);
    console.log(deletedUser);

    // ✅ Update a user’s age and push a new tag (returns updated document)
    //  { new: false }	(default) returns the document before it was updated
    // { new: true }	returns the document after it has been updated (✅ most useful in practice)
    const updateUser = await user.findByIdAndUpdate(
      newUser2._id, // updated newUser2 since newUser1 was deleted above
      { $set: { age: 100 }, $push: { tags: "updated" } },
      { new: true }
    );
    console.log("Updated user", updateUser);
  } catch (error) {
    console.log("Error->", error);
  } finally {
    // ✅ Always close DB connection after all operations
    await mongoose.connection.close();
  }
}

runQueryExample();
