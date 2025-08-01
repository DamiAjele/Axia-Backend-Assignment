const sampleModel = require("../Model/sample.model");
const cloudinary = require ("cloudinary").v2;
const fs = require("fs/promises");

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// upload single file in a single field
const singleFile = async (req, res) => {
        const body = req.body;
        const file = req.file;
        console.log(req.file)
        console.log(req.body)
    
    
       try {
        // Upload previewpix only to cloudinary 
        const response = await cloudinary.uploader.upload(file["previewPix"][0].path);
        console.log(response);

        //Append previewpix only to body 
        body["previewPix"] = response.secure_url;
        console.log(response.secure_url)


        // Create post
        const newPost = new postModel({
            creator: id,
            ...body,
        });

        const savedSingle = await newPost.save();

        //Modify the user account
        await userModel.findByIdAndUpdate(id,
            { $push: {post: savedSingle.id} },
            {new: true}
        )
        await fs.unlink(file["previewPix"][0].path);
        return res.status(200).json({message: "successful"});
    } catch (error) {
        console.log(error)
        error.status = 504;
        return next(error);
    }
}

// upload array of files in a single field
const arrayFile = async (req, res) => {
      
   const body = req.body;
   const file = req.files;
   console.log(req.files)
   console.log(req.body)

    
    
 try{

        //upload previewpix only to cloudinary
        const response = await cloudinary.uploader.upload(file["previewPix"][0].path);
        console.log(response);

        //Append previewpix only to body 
        body["previewPix"] = response.secure_url;
        console.log(response.secure_url)


        //create post
        const newPost = new postModel({
            creator: id,
            ...body,
        });

        const savedArray = await newPost.save();

        //Modify the user account
        await userModel.findByIdAndUpdate(id,
            { $push: {post: savedArray.id} },
            {new: true}
        )

        await fs.unlink(file["previewPix"][0].path);
        return res.status(200).json({message: "successful"});
    } catch (error) {
        console.log(error)
        error.status = 504;
        return next(error)
    }
}

//Upload array of files in multiple fields
const multipleFile = async (req, res) => {

        const body = req.body;
        const file = req.files;
        console.log(req.files);
        console.log(req.body);
    
    
    
    try {
        // Upload to cloudinary 
        const previewPixResponse = await cloudinary.uploader.upload(file["previewPix"][0].path);
        const detailedPixResponse = await cloudinary.uploader.upload(file["detailedPix"][0].path);
        console.log(previewPixResponse);
        console.log(detailedPixResponse);

        body["previewPix"] = previewPixResponse.secure_url;
        body["detailedPix"] = detailedPixResponse.secure_url;

        console.log(previewPixResponse.secure_url);
        console.log(detailedPixResponse.secure_url);

        // create post
        const newPost = new postModel({
            creator: id,
            ...body,
        });

        const savedArray = await newPost.save();

        //Modify the user account
        await userModel.findByIdAndUpdate(id,
            { $push: {post: savedArray.id} },
            {new: true}
        )

        await fs.unlink(file["previewPix"][0].path);
        await fs.unlink(file["detailedPix"][0].path)
        return res.status(200).json({message: "Successful"})
    } catch (error) {
        console.log(error)
        error.status = 504;
        return next(error)
    }
}


module.exports = {singleFile, arrayFile, multipleFile};