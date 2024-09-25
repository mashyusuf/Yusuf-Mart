const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
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
    const reviewsCollection = client.db("Yusuf-Mart").collection("reviews");

    // Fetch filtered products based on query parameters
    app.get("/allData", async (req, res) => {
      const { category, available, special } = req.query;

      let query = {};

      if (category) {
        query.category = category;
      }
      if (available) {
        query.available = available;
      }
      if (special) {
        query.special = { $in: special.split(",") }; // Allows filtering by multiple special types
      }

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
