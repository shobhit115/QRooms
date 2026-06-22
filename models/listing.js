const mongoose = require("mongoose");
const Review = require("./review");

const schema = mongoose.Schema;
const listingSchema = new schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: {
        type: Number,
        default: 0,
    },
    location: String,
    country: String,

    reviews: [
        {
            type: schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: schema.Types.ObjectId,
        ref: "user",
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [lng, lat]
        }
    }
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;