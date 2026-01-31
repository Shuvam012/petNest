import Product from "../models/Product.js";


/**
 * @desc Create new product (Admin only )
 * @route POST /api/admin/products
 * @access Private/Admin
 */





const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            stock,
            category,
            petType,
        } = req.body;

        if (
            !name ||
            !description ||
            price === undefined ||
            stock === undefined ||
            !category ||
            !petType
        ) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Product image is required" });
        }

        const product = await Product.create({
            name,
            description,
            price,
            stock,
            category,
            petType,
            image: req.file.path,  // cloudinary url
            createdBy: req.user.id, // admin id form token
        });

        res.status(201).json({
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
};



/**
 * UPDATE PRODUCT CONTROLLER
 * @desc Update existing product (Admin only)
 * @route PUT /api/admin/products/:id
 * @access Private/Admin
 */

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);


        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        object.assign(product, req.body);
        const updateProduct = await product.save();

        res.status(200).json({
            message: "Product updated successfully",
            updateProduct
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong" + error.message
        });
    }
}


/**
 * @desc Delete a product (Admin only soft delete)
 * @route DELETE /api/admin/products/:id
 * @access Private/Admin
 */

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.isActive = false;
        await product.save();

        res.status(200).json({
            message: "Product removed successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong" + error.message
        });
    }
}

/**
 * @desc Get all products (Public)
 * @route GET /api/products
 * @access Public
 */

const getAllProducts = async (req, res) => {
    // try {
    //     const products = await Product.find({isActive:true});
    //     res.status(200).json(products);
    // }
    // catch (error) {
    //     res.status(500).json({
    //         message:"Something went wrong" + error.message
    //     });
    // }


    // Advanced filtering (petType, category, price range and search by name with pagination)

    try {
        const {
            petType,
            category,
            minPrice,
            maxPrice,
            search,
            page = 1,
            limit = 10
        } = req.query;

        const filter = { isActive: true };

        if (petType) {
            filter.petType = petType;
        }

        if (category) {
            filter.category = category;
        }
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        if (search) {
            filter.name = { $regex: search, $options: 'i' };
        }

        const skip = (Number(page) - 1) * Number(limit);

        const totalProducts = await Product.countDocuments(filter);

        const products = await Product.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));



        res.status(200).json({
            products,
            totalProducts,
            currentPage: Number(page),
            totalPages: Math.ceil(totalProducts / Number(limit))
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong" + error.message
        });
    }

}

/**
 * @desc Get product by ID (Public)
 * @route GET /api/products/:id
 * @access Public
 */

const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({
            _id: req.params.id,
            isActive: true
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // res.json(product);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong" + error.message
        });
    }
}

export {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductById
}