// Function to calculate the fitness of a chromosome. Fitness is a measure of how good the solution represented by the chromosome is.
export function calculateFitness(chromosome, items, bagCapacities) {
	let totalValue = 0; // Total value of items in the bags
	let weights = [0, 0]; // Array to keep track of the total weight in each bag
	let penalty = 0; // Penalty for exceeding bag capacity

	// Iterate over each gene in the chromosome
	chromosome.forEach((gene, index) => {
		if (gene > 0) {
			// gene > 0 means the item is placed in a bag (1 or 2)
			weights[gene - 1] += items[index].weight; // Add item weight to the corresponding bag
			// If the weight exceeds the capacity, add to penalty
			if (weights[gene - 1] > bagCapacities[gene - 1]) {
				penalty += weights[gene - 1] - bagCapacities[gene - 1];
			}
			totalValue += items[index].value; // Add item value to total value
		}
	});

	// The fitness is the total value minus any penalty for exceeding capacities
	return Math.max(0, totalValue - penalty);
}

// Function to initialize the population with random chromosomes
function initializePopulation(size, items) {
	let population = [];

	for (let i = 0; i < size; i++) {
		let chromosome = items.map(() => Math.floor(Math.random() * 3)); // Create a chromosome with random genes (0, 1, 2)
		population.push(chromosome);
	}
	return population;
}

// Function to select a chromosome from the population using tournament selection
function select(population, fitnessValues) {
	const tournamentSize = 5; // Size of the tournament
	let best = null;
	let bestFitness = -Infinity;

	for (let i = 0; i < tournamentSize; i++) {
		let idx = Math.floor(Math.random() * population.length); // Randomly select a chromosome
		if (fitnessValues[idx] > bestFitness) {
			// If it has better fitness, select it
			best = population[idx];
			bestFitness = fitnessValues[idx];
		}
	}

	return best;
}

// Function to perform crossover between two parent chromosomes
function crossover(parent1, parent2) {
	let child = [];
	let crossoverPoint = Math.floor(Math.random() * parent1.length); // Random crossover point

	for (let i = 0; i < parent1.length; i++) {
		child.push(i < crossoverPoint ? parent1[i] : parent2[i]); // Take genes from first parent up to crossover point, then from second parent
	}
	return child;
}

// Function to mutate a chromosome based on a mutation rate
function mutate(chromosome, mutationRate) {
	return chromosome.map(
		(gene) =>
			Math.random() < mutationRate ? Math.floor(Math.random() * 3) : gene // Randomly mutate the gene based on mutation rate
	);
}

// Main function to run the genetic algorithm
export function runGeneticAlgorithm(
	items,
	bagCapacities,
	populationSize,
	generations,
	mutationRate
) {
	let population = initializePopulation(populationSize, items); // Initialize population
	let bestSolution = null;
	let bestFitness = -Infinity;

	for (let i = 0; i < generations; i++) {
		let fitnessValues = population.map(
			(chromosome) => calculateFitness(chromosome, items, bagCapacities) // Calculate fitness for each chromosome
		);

		let currentBestIdx = fitnessValues.indexOf(Math.max(...fitnessValues)); // Find the best chromosome in the current generation
		if (fitnessValues[currentBestIdx] > bestFitness) {
			bestFitness = fitnessValues[currentBestIdx];
			bestSolution = population[currentBestIdx]; // Update best solution if current is better
		}

		let newPopulation = [bestSolution]; // Start new population with the best solution

		while (newPopulation.length < populationSize) {
			let parent1 = select(population, fitnessValues); // Select two parents
			let parent2 = select(population, fitnessValues);
			let child = crossover(parent1, parent2); // Create a child through crossover
			child = mutate(child, mutationRate); // Mutate the child
			newPopulation.push(child); // Add the new child to the population
		}

		population = newPopulation; // Replace the old population with the new population
	}
	return population; // Return the final population after all generations
}
