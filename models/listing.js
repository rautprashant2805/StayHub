const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review =  require("./reviews.js");
const { reviewSchema } = require("../schema");
const User =  require("./user.js");


const listingSchema = new Schema({
    title: {
        type : String,
        required: true
    },
    description : String,
    image : {
        type: {
            filename: String,
            url: String
        },
        default: {
            filename: "defaultImage",
            url: "https://images.unsplash.com/photo-1737741276705-569ebd946f5b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1MHx8fGVufDB8fHx8fA%3D%3D"
        },
        set: (v) =>  
            v === "" 
                ? 
                { 
                    filename: "defaultImage", 
                    url: "https://images.unsplash.com/photo-1737741276705-569ebd946f5b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1MHx8fGVufDB8fHx8fA%3D%3D" 
                }
                : v,

    },
    price : Number,
    location: String,
    country: String,
    reviews:[
        {
            type : Schema.Types.ObjectId,
            ref: "Review"

        }
    ],
    owner: {
        type : Schema.Types.ObjectId,
        ref: "User",
    },
    geometry : {
        type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number], 
      required: true
    }
    }
})
listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    };
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;