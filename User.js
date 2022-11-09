const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    street: String,
    city: String
})

const userSchema = new mongoose.Schema({
    name: String,
    age: {
        type: Number,
        min: 1,
        max: 130,
        validate: {
            validator: v => v % 2 === 0,
            message: props => `${props.value} is not an even number`,
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 9,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    },
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
    hobbies: [String],
    address: addressSchema,
})

// can't use an arrow function here because we need to use 'this'
userSchema.methods.sayHi = function () {
    console.log(`Hi, I'm ${this.name}`)
}

userSchema.statics.findByName = function(name) {
    return this.find({ name: new RegExp(name, 'i') })
}

userSchema.query.byName = function(name) {
    return this.where({ name: new RegExp(name, 'i') })
}

// creates unsaved property that is referencable
userSchema.virtual("namedEmail").get(function() {
    return `${this.name} <${this.email}>`
})

userSchema.pre('save', function(next) {
    this.updatedAt = Date.now()
    throw new Error("Fail save")
})

userSchema.pre('save', function(doc, next) {
    doc.sayHi()
    next()
})

module.exports = mongoose.model("User", userSchema)