import React from "react";

function ResultsDisplay({ items, bestSolution, fitness }) {
	// Create arrays to hold items for each bag
	const bag1Items = [];
	const bag2Items = [];

	// Iterate over the bestSolution to categorize items into bags
	bestSolution.forEach((bag, index) => {
		if (bag === 1) {
			bag1Items.push(items[index]);
		} else if (bag === 2) {
			bag2Items.push(items[index]);
		}
	});

	return (
		<div>
			<h2>Results</h2>
			<p>Fitness: {fitness}</p>
			<div>
				<h3>Truck 1 Contents</h3>
				<ul>
					{bag1Items.map((item, index) => (
						<li key={index}>
							{item.name ? item.name : `Item ${index + 1}`}:
							Weight {item.weight}, Value {item.value}
						</li>
					))}
				</ul>
			</div>
			<div>
				<h3>Truck 2 Contents</h3>
				<ul>
					{bag2Items.map((item, index) => (
						<li key={index}>
							{item.name ? item.name : `Item ${index + 1}`}:
							Weight {item.weight}, Value {item.value}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default ResultsDisplay;
