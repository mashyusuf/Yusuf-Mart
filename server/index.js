const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const jwt = require('jsonwebtoken');
//middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ziugtg4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const allCategoryCollection = client.db("Yusuf-Mart").collection("allData");
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


    // JWT RELATED API---------
    app.post('/jwt',async(req,res)=>{
      const user = req.body;
      const token = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:'100d'
      });
      res.send({token})
    })

    //users related Api ---
    app.get('/user', async(req,res)=>{
      console.log(req.headers)
      const result = await usersCollection.find().toArray();
      res.send(result);
    })

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

    //fetch the this weak  Data From database
    app.get("/thisWeakProducts", async (req, res) => {
      const result = await thisWeakProductsCollection.find().toArray();
      res.send(result);
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
      const result = await superOfferProductsCollection.find().toArray();
      res.send(result);
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
        return res
          .status(200)
          .send({
            exists: true,
            message: "User already exists",
            insertedId: null,
          });
      }

      const result = await usersCollection.insertOne(user);
      res
        .status(201)
        .send({
          exists: false,
          message: "User registered successfully",
          insertedId: result.insertedId,
        });
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
