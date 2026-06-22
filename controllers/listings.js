const Listing = require("../models/listing.js");
const axios = require("axios");

// INDEX
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

// NEW FORM
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

// SHOW
module.exports.showListing = async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", {
    listing,
    coordinates: listing.geometry?.coordinates || null
});
};

// EDIT FORM
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing you requested to edit does not exist!");
        return res.redirect("/listings");
    }
    let originalImage = listing.image.url;
    originalImage = originalImage.replace("/upload", "/upload/w_250/");

    res.render("listings/edit.ejs", { listing , originalImage});
};

// CREATE
module.exports.createListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image.url = url;
    newListing.image.filename = filename;

     const location = req.body.listing.location;

    try {
        const geoRes = await axios.get(
            `https://nominatim.openstreetmap.org/search`,
            {
                params: {
                    q: location + ", India",
                    format: "json",
                    limit: 1
                },
                headers: {
                    "User-Agent": "your-app-name" // REQUIRED (or it may block you)
                }
            }
        );

        if (geoRes.data.length > 0) {
            const { lat, lon } = geoRes.data[0];

            newListing.geometry = {
                type: "Point",
                coordinates: [parseFloat(lon), parseFloat(lat)]
            };
        } else {
            console.log("Location not found");
        }

    } catch (err) {
        console.log("Geocoding error:", err.message);
    }
    await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

// UPDATE
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let updateData = { ...req.body.listing };
    if (req.file) {
        updateData.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    await Listing.findByIdAndUpdate(id, updateData);

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

// DELETE
module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;

    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};