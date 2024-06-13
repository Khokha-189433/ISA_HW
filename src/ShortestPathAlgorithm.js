// Function to find the shortest path in a graph from a start node to an end node using recursion, memoization, and a visited set.
export const findShortestPath = (
	graph, // The graph represented as an adjacency list
	start, // The starting node
	end, // The target node
	memo = {}, // Object to store previously computed shortest paths
	visited = new Set() // Set to keep track of visited nodes to avoid cycles
) => {
	if (start === end) return { distance: 0, path: [start] }; // Base case: if start and end are the same, no travel needed
	if (memo[start] && memo[start][end]) return memo[start][end]; // Return memoized result if it exists
	if (visited.has(start)) return { distance: Infinity, path: [] }; // If start has been visited, return infinite distance to indicate no valid path

	let shortest = { distance: Infinity, path: [] }; // Initialize shortest path as infinite distance
	visited.add(start); // Mark the current node as visited

	const neighbors = graph[start] || []; // Get neighbors of the current node or an empty array if none
	for (const [neighbor, distance] of neighbors) {
		// Iterate through each neighbor
		if (!visited.has(neighbor)) {
			// If the neighbor hasn't been visited
			const result = findShortestPath(
				graph,
				neighbor,
				end,
				memo,
				visited
			); // Recursively find the shortest path from the neighbor to the end
			const currentDistance = result.distance + distance; // Calculate total distance from start to end via the neighbor
			if (currentDistance < shortest.distance) {
				// If the calculated path is shorter, update the shortest path
				shortest = {
					distance: currentDistance,
					path: [start, ...result.path],
				};
			}
		}
	}

	visited.delete(start); // Remove the current node from visited set for other potential paths
	if (!memo[start]) memo[start] = {}; // Initialize memoization for this node if not already done
	memo[start][end] = shortest; // Memoize the shortest path found from start to end
	return shortest; // Return the shortest path object
};
