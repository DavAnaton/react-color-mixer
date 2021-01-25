



const mixColorsRGB = (colors) => {
	return colors.reduce((acc, c) => {
		acc.red += c.red / colors.length;
		acc.green += c.green / colors.length;
		acc.blue += c.blue / colors.length;
		return acc;
	}, {red: 0, green: 0, blue: 0});
};

const mixWithWeights = (colors, weights) => {
	const totalWeight = weights.reduce(function(a, b) { return a + b; }, 0);

	return colors.reduce((acc, c, i) => {
		acc.red += c.red * weights[i] / totalWeight;
		acc.green += c.green * weights[i] / totalWeight;
		acc.blue += c.blue * weights[i] / totalWeight;
		return acc;
	}, {red: 0, green: 0, blue: 0});
};

const getDistance = (color1, color2) => Math.sqrt(
	(color1.red - color2.red)**2 + 
	(color1.green - color2.green)**2 + 
	(color1.blue - color2.blue)**2
);

const getClosest = (colors, color) => {
	const distances = colors.map(c => getDistance(c, color));
	let index = distances.indexOf(Math.min(...distances));
	return colors[index];
};

function addvector(a,b){
    return a.map((e,i) => e + b[i]);
}
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const generateWeights = (colorsLength, maxColors, maxRatio) => {
	let weights = [];

	let singleWeights = [];
	let empty = new Array(colorsLength).fill(0);
	for(let i = 0; i<colorsLength; i++){
		singleWeights.push(Object.assign([], empty, {[i]: 1}));
	}

	weights.push(...singleWeights);
	for(let ratio = 1; ratio <= maxRatio; ratio++){
		let ratioWeights = [];
		for(let weight of weights){
			ratioWeights.push(...singleWeights.map(w => addvector(weight, w)).filter(w => w.filter(wc => wc>0).length <= maxColors));
		}
		weights.push(...ratioWeights);
		weights = weights.filter(onlyUnique);
	}
	return weights;
};

const getMix = (colors, color, config = {}) => {
	let weights = generateWeights(colors.length, config.maxColors || 3, config.maxRatio || 4);
	let mixedColors = weights.map(w => mixWithWeights(colors, w));

	const distances = mixedColors.map(c => getDistance(c, color));
	let index = distances.indexOf(Math.min(...distances));
	return weights[index];
};

const generateRandomColor = () => ({
	red: Math.floor(Math.random() * 255), 
	green:Math.floor(Math.random() * 255), 
	blue:Math.floor(Math.random() * 255)
});

export {
	mixColorsRGB,
	mixWithWeights as mixColors,
	getClosest, 
	getMix,
	generateRandomColor
};
