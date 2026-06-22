const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const updateListingRating = async (listingId) => {

    const listing = await Listing.findById(listingId)
        .populate("reviews");

    const reviewCount = listing.reviews.length;

    if(reviewCount === 0){

        listing.avgRating = 0;
        listing.reviewCount = 0;

    }else{

        const totalRating = listing.reviews.reduce(
            (sum, review) => sum + review.rating,
            0
        );

        listing.avgRating = totalRating / reviewCount;
        listing.reviewCount = reviewCount;
    }

    await listing.save();
};
// CREATE REVIEW
module.exports.createReview = async (req, res) => {
    let { id } = req.params;

    let listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    await updateListingRating(id);
    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${id}`);
};

// DELETE REVIEW
module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {
        $pull: { reviews: reviewId }
    });

    await Review.findByIdAndDelete(reviewId);
    await updateListingRating(id);
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
};