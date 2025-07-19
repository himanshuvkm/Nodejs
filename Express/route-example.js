const express = require("express");
const app = express();

// root route

app.get("/", (req, res) => {
  res.send("Welcome to our home page");
});

//get all products

app.get("/products", (req, res) => {
  const products = [
    {
      id: 1,
      label: "Product 1",
    },
    {
      id: 2,
      label: "Product 2",
    },
    {
      id: 3,
      label: "Product 3",
    },
  ];
  res.json(products);
});

//Get Single Product

app.get("/products/:id", (req, res) => {
  console.log("req.params", req.params);
  const id = parseInt(req.params.id);
  const products = [
    {
      id: 1,
      label: "Product 1",
    },
    {
      id: 2,
      label: "Product 2",
    },
    {
      id: 3,
      label: "Product 3",
    },
  ];
  const getSingleProduct = products.find((p) => p.id === id);
  if (getSingleProduct) {
    res.json(getSingleProduct);
  } else {
    res.status(400).send("Product is not found please try with anotherid");
  }
});

const port = 3000;
app.listen(port, () => {
  console.log("Server listened");
});
