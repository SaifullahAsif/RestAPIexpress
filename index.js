const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.json());
app.use(express.json());

let cars = [
    { id: 1, make: 'Toyota', model: 'Crown', year: 2022 },
    { id: 2, make: 'Mercedez', model: 'E63AMG', year: 2021 },
    { id: 3, make: 'Bugatti', model: 'Chiron', year: 2020 },
];

app.get('/api/cars', (req, res) => {
    res.json(cars);
});

app.get('/api/cars/:id', (req, res) => {
    const carId = parseInt(req.params.id);
    const car = cars.find((c) => c.id === carId);

if (!car) {
    return res.status(404).json({ error: 'Car not found' });
}

    res.json(car);
});

app.post('/api/cars', (req, res) => {
    const { make, model, year } = req.body;

if (!make || !model || !year) {
    return res.status(400).json({ error: 'Make, model, and year are required' });
}

const newCar = { id: cars.length + 1, make, model, year };
cars.push(newCar);

    res.status(201).json(newCar);
});

app.put('/api/cars/:id', (req, res) => {
    const carId = parseInt(req.params.id);
    const car = cars.find((c) => c.id === carId);

if (!car) {
    return res.status(404).json({ error: 'Car not found' });
}

const { make, model, year } = req.body;

if (make) {
    car.make = make;
}

if (model) {
    car.model = model;
}

if (year) {
    car.year = year;
}

    res.json(car);
});


app.delete('/api/cars/:id', (req, res) => {
    const carId = parseInt(req.params.id);
    cars = cars.filter((c) => c.id !== carId);

    res.json({ message: 'Car deleted successfully' });
});

app.listen(5000, () => {
    console.log(`Server is running on port ${5000}`);
});
