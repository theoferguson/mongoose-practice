const mongoose = require('mongoose')
const User = require('./User')

mongoose.connect("mongodb://localhost/testdb")

run()
async function run() {
    try {
        // const user = await User.create({
        //     name: "Theo",
        //     age: 30,
        //     hobbies: ["coding", "running"],
        //     address: {
        //         street: "247 dean street",
        //     },
        //     email: "test@Test.com"
        // })
        // user.createdAt = Date.now()
        // await user.save()
        // console.log(user)

        // const user = await User.findById("636aeca48b34242dec8b0b7c")
        
        // const user = await User.find({ name: "Theo" })

        // const user = await User.deleteOne({ name: "Theo" })

        // const user = await User.where("name").equals("Theo").limit(1).populate("bestFriend")
        // user[0].bestFriend = "636aec54424872de00727227"
        // user[0].save()

        // const user = await User.find().byName("Theo").populate("bestFriend")

        const user = await User.findOne({name: "Theo"}).populate("bestFriend")

        console.log(user)
        await user.save()
        console.log(user.namedEmail)
    } catch (e) {
        console.log(e.message)
    }
}
