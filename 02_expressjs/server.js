import express from "express";

const app = express();
const port = 3000;

// use Router
const router = express.Router();

//use JSON
app.use(express.json());

// use Middleware
app.use((req, res, next) => {
  const timeStamp = new Date().toISOString();
  console.log(`[${timeStamp}] ${req.method} ${req.url}`);
  next();
});

let cars = [
  { id: 1, make: "Benz", model: "C300", year: 2024, price: 45000 },
  { id: 2, make: "BMW", model: "X5", year: 2021, price: 60000 },
  { id: 3, make: "Audi", model: "A4", year: 2000, price: 20000 },
  { id: 4, make: "Toyota", model: "Camry", year: 2021, price: 30000 },
  { id: 5, make: "Honda", model: "Accord", year: 2022, price: 35000 },
  { id: 6, make: "Mazda", model: "CX-5", year: 2025, price: 40000 },
];

router.get("/", (req, res) => {
  res.json(cars);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const car = cars.find((c) => c.id === id);
  if (!car) return res.status(404).send("Car not found");

  res.json(car);
});

router.post("/", (req, res) => {
  const { make, model, year, price } = req.body;

  if (!make || !model || !year || !price) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const newCar = {
    id: cars.length + 1,
    make,
    model,
    year: Number(year),
    price: Number(price),
  };

  cars.push(newCar);

  res.status(201).json(newCar);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  
  const index = cars.findIndex((c) => c.id === id);

  if (index === -1) return res.status(404).send({ error: "Car not found" });
  
  const { make, model, year, price } = req.body;

  cars[index].make = make;
  cars[index].model = model;
  cars[index].year = Number(year);
  cars[index].price = Number(price);

  res.json(cars[index]);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = cars.findIndex((c) => c.id === id);
  if (index === -1) return res.status(404).send({ error: "Car not found" });

  const deleted = cars.splice(index,1)[0];
  res.json({message: "Car deleted", car: deleted});
  // cars = cars.filter((c) => c.id !== id);
  // res.json(cars);
});

app.use("/api/v1/cars", router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
