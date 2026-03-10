const Category = require('../models/Category');

// CREATE CATEGORY
exports.createCategory = async (req, res) => {
    try {
        const { title, description, isActive } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required"
            });
        }
            console.log( req.user.role)
        if (!req.user.isAdmin) {
            return res.status(403).json({
                message: "Only admin can create categories"
            });
        }

        const category = await Category.create({
            title,
            description,
            isActive
        });

        res.status(201).json({
            message: "Category created successfully",
            category
        });

    } catch (err) {
        res.status(500).json({
            message: "Something went wrong....",
            error: err.message
        });
    }
};



// GET SINGLE CATEGORY
exports.getCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.status(200).json({ category });

    } catch (err) {
        res.status(500).json({
            message: "Something went wrong in get",
            error: err.message
        });
    }
};



// GET ALL CATEGORIES
exports.getAllCategory = async (req, res) => {
    try {

        const categories = await Category.find();

        res.status(200).json({ categories });

    } catch (err) {
        res.status(500).json({
            message: "Something went wrong in detAll",
            error: err.message
        });
    }
};



// UPDATE CATEGORY
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, isActive } = req.body;

        if (!req.user.isAdmin) {
            return res.status(403).json({
                message: "Only admin can create categories"
            });
        }

        const category = await Category.findByIdAndUpdate(
            id,
            { title, description, isActive },
            { new: true, runValidators: true }
        );

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.status(200).json({
            message: "Updated successfully",
            category
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// Delete Category 

exports.deletecategory = async (req, res ) => {
   try {
     const { id } = req.params;
    if (!req.user.isAdmin) {
            return res.status(403).json({
                message: "Only admin can create categories"
            });
        }
    
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }
    res.status(200).json({message : 'Category delete successfully...'})
     
   } catch (err) {
    res.status(500).json({error : err})
   }


}