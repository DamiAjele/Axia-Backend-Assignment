const mongoose = require("mongoose");

const sampleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    previewPix: {
        type: String,
        required: true
    },

    detailedPix: {
        type: String,
        required: true
    },

    creator: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
    },
    }, {timestamps: true}
);

const sampleModel = mongoose.model("Sample", sampleSchema)

module.exports = sampleModel;
