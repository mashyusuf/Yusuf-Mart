const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SEC_KEY);
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// CORS options
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://yusufmart-6fb88.web.app",
    "https://yusufmart-6fb88.firebaseapp.com",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

// Verify Token Middleware
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "unauthorized access" });
  }

  const token = authHeader.split(" ")[1]; // Extract token from 'Bearer <token>'
  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.user = decoded;
    next();
  });
};

// MongoDB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ziugtg4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const allCategoryCollection = client
      .db("Yusuf-Mart")
      .collection("AllProducts");
    const thisWeakProductsCollection = client
      .db("Yusuf-Mart")
      .collection("thisWeak");
    const newArrivalsCollection = client
      .db("Yusuf-Mart")
      .collection("new Arrivals");
    const discountProductsCollection = client
      .db("Yusuf-Mart")
      .collection("FeatureProducts");
    const superOfferProductsCollection = client
      .db("Yusuf-Mart")
      .collection("super");
    const bestSellesCollection = client
      .db("Yusuf-Mart")
      .collection("bestSelles");
    const addToCartCollection = client.db("Yusuf-Mart").collection("carts");
    const addToHeartCollection = client.db("Yusuf-Mart").collection("heart");
    const reviewsCollection = client.db("Yusuf-Mart").collection("reviews");
    const usersCollection = client.db("Yusuf-Mart").collection("users");
    const payemntCollection = client.db("Yusuf-Mart").collection("payment");

    // JWT RELATED API---------
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "100d",
      });
      res.send({ token });
    });

    //users related Api ---
    app.get("/user", async (req, res) => {
      console.log(req.headers);
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    // Fetch filtered products based on query parameters
    app.get("/allData", async (req, res) => {
      const {
        category,
        minPrice,
        maxPrice,
        specialOffer,
        sortBy,
        page = 1,
        limit = 12,
        search,
      } = req.query;

      let filter = {};
      const options = {
        skip: (page - 1) * limit,
        limit: parseInt(limit),
      };

      // If category is provided, add it to the filter
      if (category) {
        filter.category = category;
      }

      // Add price filtering to the query
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) {
          filter.price.$gte = parseFloat(minPrice);
        }
        if (maxPrice) {
          filter.price.$lte = parseFloat(maxPrice);
        }
      }

      // Add special offer filtering
      if (specialOffer) {
        filter.special = specialOffer;
      }

      if (search) {
        // Search by name or description
        filter.$or = [
          { name: { $regex: search, $options: "i" } }, // Case-insensitive search
          { description: { $regex: search, $options: "i" } },
        ];
      }

      try {
        const sortOption =
          sortBy === "highToLow"
            ? { price: -1 }
            : sortBy === "lowToHigh"
            ? { price: 1 }
            : {};

        const totalItems = await allCategoryCollection.countDocuments(filter);
        const totalPages = Math.ceil(totalItems / limit);

        const products = await allCategoryCollection
          .find(filter)
          .sort(sortOption)
          .skip(options.skip)
          .limit(options.limit)
          .toArray();

        res.send({ products, totalPages, currentPage: parseInt(page) });
      } catch (error) {
        res.status(500).send({ message: "Error fetching data", error });
      }
    });

    //category data from db base fro home ---
    app.get("/category/:category", async (req, res) => {
      const { category } = req.params;
      const query = category ? { category } : {}; // If category is provided, filter by it
      const result = await allCategoryCollection.find(query).toArray();
      res.send(result);
    });
    // Fetch the "This Week Only" products from the database
    app.get("/thisWeakProducts", async (req, res) => {
      try {
        const result = await allCategoryCollection
          .find({ special: "Only for this week" })
          .toArray();
        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    //fetch the this newArrivals Products Data From database
    app.get("/newArrivals", async (req, res) => {
      const result = await newArrivalsCollection.find().toArray();
      res.send(result);
    });
    //fetch the this feaatureProducts  Data From database
    app.get("/featureProducts", async (req, res) => {
      const result = await discountProductsCollection.find().toArray();
      res.send(result);
    });
    //fetch the this SUPER offer  2Data From database
    app.get("/superProducts", async (req, res) => {
      try {
        const result = await allCategoryCollection
          .find({ special: "Super Special Package" })
          .toArray();
        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    //fetch the this best selles  2Data From database
    app.get("/bestSelles", async (req, res) => {
      const result = await bestSellesCollection.find().toArray();
      res.send(result);
    });
    //fetch the this best selles  2Data From database
    app.get("/reviews", async (req, res) => {
      const result = await reviewsCollection.find().toArray();
      res.send(result);
    });

    //Post , delete, emailGet, put, patch era start Now -----------

    //Add To cart Post In Database----------------
    app.post("/addToCart", async (req, res) => {
      const CartItem = req.body;
      const result = await addToCartCollection.insertOne(CartItem);
      res.send(result);
    });

    //Add To Cart Data For User Get-----
    app.get("/cartData", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await addToCartCollection.find(query).toArray();
      res.send(result);
    });

    //-Add To Product  into Heart Or Bookmark -----
    app.post("/addToHeart", async (req, res) => {
      const heartItem = req.body;
      const result = await addToHeartCollection.insertOne(heartItem);
      res.send(result);
    });
    //add to heart get the data for user -----
    app.get("/heartData", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await addToHeartCollection.find(query).toArray();
      res.send(result);
    });

    //Now Shop Now Cart Server Code Start Now -------
    //Get All Data from data base for One Data id-----------

    // Backend code to fetch related products by category
    app.get("/allProducts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      // Find the current product
      const product = await allCategoryCollection.findOne(query);

      if (product) {
        // Fetch other products from the same category
        const relatedProductsQuery = {
          category: product.category,
          _id: { $ne: new ObjectId(id) },
        };
        const relatedProducts = await allCategoryCollection
          .find(relatedProductsQuery)
          .toArray();

        // Send both the current product and the related products
        res.send({ product, relatedProducts });
      } else {
        res.status(404).send({ message: "Product not found" });
      }
    });

    //-----Add To Cart And Add to Heart Delete Aura Start Now --------

    //Add To Cart Delete----------
    app.delete("/addTocartDelete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await addToCartCollection.deleteOne(query);
      res.send(result);
    });
    //Add To Heart Delete----------
    app.delete("/addToHeartDelete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await addToHeartCollection.deleteOne(query);
      res.send(result);
    });

    //-------user data Into Database----

    app.post("/user", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await usersCollection.findOne(query);

      if (existingUser) {
        return res.status(200).send({
          exists: true,
          message: "User already exists",
          insertedId: null,
        });
      }

      const result = await usersCollection.insertOne(user);
      res.status(201).send({
        exists: false,
        message: "User registered successfully",
        insertedId: result.insertedId,
      });
    });

    // create-payment-intent // Stripe Payment method---
    app.post("/create-payment-intent", verifyToken, async (req, res) => {
      const price = req.body.price;
      const priceInCent = parseFloat(price) * 100;
      if (!price || priceInCent < 1) return;
      // generate clientSecret
      const { client_secret } = await stripe.paymentIntents.create({
        amount: priceInCent,
        currency: "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
          enabled: true,
        },
      });
      // send client secret as response
      res.send({ clientSecret: client_secret });
    });

    // Payment-related API

    // Payment API - POST (Save Payment Info)
    app.post("/payment", async (req, res) => {
      const paymentInfo = req.body;

      try {
        // Save the payment information
        const result = await payemntCollection.insertOne(paymentInfo);
        res.send({ paymentResult: result });
      } catch (error) {
        console.error("Error saving payment:", error);
        res.status(500).send({ message: "Failed to save payment information" });
      }
    });

    // Cart API - DELETE (Delete Cart Items)
    app.delete("/cart", async (req, res) => {
      const { email } = req.body; // Get the email from the request body

      try {
        // Delete the cart items based on the user's email
        const deleteResult = await addToCartCollection.deleteMany({
          email: email,
        });
        res.send({ deleteResult });
      } catch (error) {
        console.error("Error deleting cart items:", error);
        res.status(500).send({ message: "Failed to delete cart items" });
      }
    });


    //-------Dashboard Eraaaaaaaaaa-------


    //user Payment History -----------
    app.get('/payment-history', async (req, res) => {
      const userEmail = req.query.email; // Assuming email is passed in the query
      const result = await payemntCollection.find({ email: userEmail }).toArray();
      res.send(result);
    });
    
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Yusuf Mart Is Open Now");
});

app.listen(port, () => {
  console.log(`Yusuf Mart Is Open Now ${port}`);
});
