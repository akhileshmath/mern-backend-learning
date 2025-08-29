//user.controller.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "chai and code help to learn backend",
  });
  // Get the user from frontend
  // validation -not empty
  // check if user already exist  -check username and email
  // check for images ,check for avtar
  // upload them to cloudnary, avtar
  // create user object -create entry in db
  // remove password and refresh token feild from response
  // check for user creation
  // return result
  const { fullName, email, username, password } = req.body;
  console.log("email", email);

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All feild are required");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or ursername already exited");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUseer = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if (!createdUseer){
    throw new ApiError(500,"Something get wrong while checking the user ")
  }

  return res.status(200).json(
    new ApiResponse(200,createdUseer, "User Regested succedully")
  )

});

export { registerUser };
