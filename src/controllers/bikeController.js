const bike=require("../models/Bike");
const addBike=async(req,res)=>
{
    try
    {
        const{ bikeName,brand,image,location,pricePerHour,description}=req.body;
        if(!bikeName || !brand || !image || !location || !pricePerHour || !description)
        {
            return res.status(400).json({
                success:false,
                message:"All fields are required and must have a valid format"
            });
        }
        console.log("req.user:", req.user);
        console.log("req.user.id:", req.user?.id);
        const newBike= await bike.create({
            owner: req.user.id,
            bikeName,
            brand,
            image,
            location,
            pricePerHour,
            description
        });
        res.status(201).json({
            success:true,
            message:"Bike added successfully"
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error adding bike"
        });
    }
}

const getAllBikes=async(req,res)=>
{
    try{
        const bikes=await bike.find();
        res.status(200).json({
            success:true,
            data:bikes
        });
    }
    catch(error)
    {
        res.status(500).json({
            success:false,
            message:"Error fetching bikes"
        });
    }
}

const getMyBikes = async (req, res) => {
  try {
    const bikes = await Bike.find({
      owner: req.user.id,
    });

    res.status(200).json({
      success: true,
      count: bikes.length,
      bikes,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateBike = async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);

    if (!bike) {
      return res.status(404).json({
        success: false,
        message: "Bike not found",
      });
    }

    // Owner Check
    if (bike.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this bike",
      });
    }

    const updatedBike = await Bike.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Bike updated successfully",
      bike: updatedBike,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const deleteBike = async (req, res) => {
  try {

    const bike = await Bike.findById(req.params.id);

    if (!bike) {
      return res.status(404).json({
        success: false,
        message: "Bike not found",
      });
    }

    if (bike.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this bike",
      });
    }

    await bike.deleteOne();

    res.status(200).json({
      success: true,
      message: "Bike deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
module.exports = { addBike,getAllBikes,getMyBikes,updateBike,deleteBike };