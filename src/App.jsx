import {useState} from 'react';
import ColorSelect from './ColorSelect';
import WeightSelect from './WeightSelect';
import ColorMix from './ColorMix';

import {mixColors, generateRandomColor} from './helpers';

const App = () => {
	const [colors, setColors] = useState([
		{red: 0, green:0, blue:0},
		{red: 255, green:255, blue:255},
		{red: 255, green:0, blue:0},
		{red: 255, green:140, blue:0},
		{red: 255, green:255, blue:0},
		{red: 0, green:255, blue:0},
		{red: 0, green:255, blue:255},
		{red: 0, green:0, blue:255},
		{red: 255, green:0, blue:255},
	]);
	const [weights, setWeights] = useState(colors.map(() => 0));

	const setColor = i => color => {
		setColors(Object.assign([], colors, {[i]: color}));
	};

	const setWeight = i => weight => () => {
		setWeights(Object.assign([], weights, {[i]: weight}));
	};

	const deleteColor = i => () => {
		setColors(colors.filter((v, j) => j!==i));
		setWeights(weights.filter((v, j) => j!==i));
	};

	const addColor = () => {
		setColors([...colors, generateRandomColor()])
		setWeights([...weights, 1]);
	}

	return <div>
		{colors.map((color, i) =>
			<div key={i}>
				<ColorSelect color={color} onColorChange={setColor(i)}/>
				<WeightSelect weight={weights[i]} onChange={setWeight(i)} onDelete={deleteColor(i)}/>
				{i < colors.length-1 && "+"}
			</div>
		)}
		<button onClick={addColor}>Add Color</button><br/>
		=
		<ColorSelect color={mixColors(colors, weights)}/>
		<hr/>
		<ColorMix colors={colors}/>
		<hr/>
	</div>;
};

export default App;