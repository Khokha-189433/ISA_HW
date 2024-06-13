import React from "react";

function ItemInput({ weight, value, setWeight, setValue, handleAddItem }) {
	return (
		<div>
			<label>
				Item Weight:
				<input
					type="number"
					placeholder="Weight"
					value={weight}
					onChange={(e) => setWeight(e.target.value)}
					className="inputStyle"
				/>
			</label>
			<label>
				Item Value:
				<input
					type="number"
					placeholder="Value"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					className="inputStyle"
				/>
			</label>
			<button onClick={handleAddItem} className="buttonStyle">
				Add Item
			</button>
		</div>
	);
}

export default ItemInput;
