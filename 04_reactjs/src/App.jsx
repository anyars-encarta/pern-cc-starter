import { useState } from "react";
import Car from "./components/Car";
import { useEffect } from "react";

const App = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Fetch cars from the backend API
    fetch("api/v1/cars")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((error) => console.error("Error fetching cars:", error));
  }, []);

  return (
    <div>
      <h1>Welcome to the Car Store</h1>

      <ul>
        {cars.map((car) => (
          <Car key={car.id} {...car} />
        ))}
      </ul>
    </div>
  );
};

export default App;
