import React, { useState } from "react";
import { runGeneticAlgorithm, calculateFitness } from "./geneticAlgorithm";
import { findShortestPath } from "./ShortestPathAlgorithm";
import "./App.css";
import ItemInput from "./itemInput.js";
import AdvancedOptions from "./AdvancedOptions";
import ResultsDisplay from "./ResultsDisplay";

function App() {
	const [items, setItems] = useState([]);
	const [weight, setWeight] = useState("");
	const [value, setValue] = useState("");
	const [truckCapacities, setTruckCapacities] = useState([50, 50]);
	const [bestSolution, setBestSolution] = useState([]);
	const [fitness, setFitness] = useState(0);
	const [populationSize, setPopulationSize] = useState(200);
	const [generations, setGenerations] = useState(100);
	const [mutationRate, setMutationRate] = useState(0.01);
	const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
	const [routes, setRoutes] = useState([]);
	const [routeStart, setRouteStart] = useState("");
	const [routeEnd, setRouteEnd] = useState("");
	const [distance, setDistance] = useState("");
	const [graph, setGraph] = useState({});

	const [shortestPathResult, setShortestPathResult] = useState({
		path: [],
		distance: 0,
		found: false,
	});

	const handleAddItem = () => {
		if (weight && value) {
			const newItem = {
				weight: parseInt(weight),
				value: parseInt(value),
			};
			setItems([...items, newItem]);
			setWeight("");
			setValue("");
		}
	};

	const handleAddRandomItems = () => {
		const randomItems = Array.from({ length: 5 }, () => ({
			weight: Math.floor(Math.random() * 100) + 1, // Random weight from 1 to 100
			value: Math.floor(Math.random() * 100) + 1, // Random value from 1 to 100
		}));
		setItems([...items, ...randomItems]);
	};

	const handleRunAlgorithm = () => {
		if (items.length === 0 || truckCapacities.some((cap) => cap <= 0)) {
			alert(
				"Please add some items and ensure both trucks have positive capacities before running the algorithm."
			);
			return;
		}

		const finalPopulation = runGeneticAlgorithm(
			items,
			truckCapacities,
			populationSize,
			generations,
			mutationRate
		);

		const best = finalPopulation.reduce(
			(best, current) =>
				calculateFitness(current, items, truckCapacities) >
				calculateFitness(best, items, truckCapacities)
					? current
					: best,
			finalPopulation[0]
		);

		setBestSolution(best);
		setFitness(calculateFitness(best, items, truckCapacities));
	};

	const toggleAdvancedOptions = () =>
		setShowAdvancedOptions(!showAdvancedOptions);

	const handleCapacityChange = (index, value) => {
		const newCapacities = [...truckCapacities];
		newCapacities[index] = parseInt(value) || 0; // Default to 0 if input is invalid
		setTruckCapacities(newCapacities);
	};

	const handleAddRoute = () => {
		if (routeStart && routeEnd && distance) {
			const newRoute = {
				start: routeStart,
				end: routeEnd,
				distance: parseInt(distance),
			};

			setRoutes([...routes, newRoute]);

			//updating the graph with the new added route
			const updatedGraph = { ...graph };
			if (!updatedGraph[routeStart]) updatedGraph[routeStart] = [];
			updatedGraph[routeStart].push([routeEnd, parseInt(distance)]);

			setGraph(updatedGraph);

			setRouteStart("");
			setRouteEnd("");
			setDistance("");
		}
	};

	// Adding Some Routes for testing purposes
	const handleAddPreMadeRoutes = () => {
		const newRoutes = [
			{ start: "1", end: "2", distance: 10 },
			{ start: "1", end: "3", distance: 15 },
			{ start: "2", end: "4", distance: 10 },
			{ start: "3", end: "4", distance: 5 },
			{ start: "2", end: "5", distance: 25 },
			{ start: "3", end: "5", distance: 20 },
			{ start: "4", end: "5", distance: 15 },
			{ start: "5", end: "6", distance: 10 },
			{ start: "2", end: "6", distance: 35 },
			{ start: "3", end: "6", distance: 30 },
			{ start: "4", end: "6", distance: 25 },
			{ start: "5", end: "7", distance: 15 },
			{ start: "6", end: "7", distance: 10 },
			{ start: "7", end: "8", distance: 20 },
		];

		let updatedGraph = { ...graph };

		//updating the graph with the new routes
		newRoutes.forEach((route) => {
			const { start, end, distance } = route;
			if (!updatedGraph[start]) updatedGraph[start] = [];
			updatedGraph[start].push([end, distance]);
		});

		setRoutes([...routes, ...newRoutes]);
		setGraph(updatedGraph);
	};

	//runing the shortest path algorithim
	const handleFindShortestPath = (start, end) => {
		const result = findShortestPath(graph, start, end);
		if (result.distance === Infinity) {
			setShortestPathResult({ path: [], distance: 0, found: false });
		} else {
			setShortestPathResult({
				path: result.path,
				distance: result.distance,
				found: true,
			});
		}
	};

	return (
		<div className="App">
			<div className="Algorithm_div">
				<h1>Genetic Algorithm</h1>
				<label></label>
				<ItemInput
					weight={weight}
					value={value}
					setWeight={setWeight}
					setValue={setValue}
					handleAddItem={handleAddItem}
				/>
				<button
					onClick={toggleAdvancedOptions}
					style={{ marginLeft: "16rem", marginTop: "19px" }}
				>
					{showAdvancedOptions
						? "Hide Advanced Options"
						: "Show Advanced Options"}
				</button>
				<AdvancedOptions
					showAdvancedOptions={showAdvancedOptions}
					populationSize={populationSize}
					generations={generations}
					mutationRate={mutationRate}
					setPopulationSize={setPopulationSize}
					setGenerations={setGenerations}
					setMutationRate={setMutationRate}
				/>
				<div>
					<h2>Set Truck Capacities</h2>
					<label>
						Truck 1 Capacity:
						<input
							type="number"
							value={truckCapacities[0]}
							onChange={(e) =>
								handleCapacityChange(0, e.target.value)
							}
							className="inputStyle"
						/>
					</label>
					<label>
						Truck 2 Capacity:
						<input
							type="number"
							value={truckCapacities[1]}
							onChange={(e) =>
								handleCapacityChange(1, e.target.value)
							}
							className="inputStyle"
						/>
					</label>
				</div>
				<hr />
				<div className="Added-Items">
					<div>
						<h2>Added Items</h2>
						<ul>
							{items.map((item, index) => (
								<li key={index}>
									Item {index + 1}: Weight: {item.weight},
									Value: {item.value}
								</li>
							))}
						</ul>
					</div>

					<button
						onClick={handleRunAlgorithm}
						className="buttonStyle"
					>
						Run Algorithm
					</button>
					<button
						onClick={handleAddRandomItems}
						className="buttonStyle"
					>
						Add Random Items
					</button>

					<ResultsDisplay
						items={items}
						bestSolution={bestSolution}
						fitness={fitness}
					/>
				</div>
			</div>

			<div className="Add-Route">
				<div>
					<h1>Shortest Path Algorithm</h1>
					<h2>Add New Route</h2>
					<input
						type="number"
						placeholder="Start"
						value={routeStart}
						onChange={(e) => setRouteStart(e.target.value)}
					/>
					<input
						type="number"
						placeholder="End"
						value={routeEnd}
						onChange={(e) => setRouteEnd(e.target.value)}
					/>
					<input
						type="number"
						placeholder="Distance"
						value={distance}
						onChange={(e) => setDistance(e.target.value)}
					/>
					<button onClick={handleAddRoute}>Add Route</button>
				</div>
				<div>
					<h2>Routes</h2>
					<button onClick={handleAddPreMadeRoutes}>
						Add Pre-Made Routes
					</button>

					<ul>
						{routes.map((route, index) => (
							<li key={index}>
								{route.start} to {route.end} - {route.distance}{" "}
								km
							</li>
						))}
					</ul>
				</div>
				<div>
					<h2>Find Shortest Path</h2>
					<input
						type="number"
						placeholder="Start Point"
						value={routeStart}
						onChange={(e) => setRouteStart(e.target.value)}
					/>
					<input
						type="number"
						placeholder="End Point"
						value={routeEnd}
						onChange={(e) => setRouteEnd(e.target.value)}
					/>
					<button
						onClick={() =>
							handleFindShortestPath(routeStart, routeEnd)
						}
					>
						Find Shortest Path
					</button>
					{shortestPathResult.found && (
						<div>
							<h3>Shortest Path Result</h3>
							<p>Distance: {shortestPathResult.distance} km</p>
							<p>Path: {shortestPathResult.path.join(" -> ")}</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
