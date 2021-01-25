import {useState} from 'react';
import styled from 'styled-components';

import ColorSelect from './ColorSelect';
import {getMix, mixColors} from './helpers';
import {useRange} from './hooks';

const ConfigContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	padding: 15px;
	max-width:150px;
`;

const CombinationContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	flex-wrap: wrap;
`;

const CombinationItem = styled.div`
	display: flex;
	flex-direction: column;
`;


const ColorMix = ({colors}) => {
	const maxColors = useRange(3);
	const maxRatio = useRange(2);

	const [wantedColor, setWantedColor] = useState({red: 0, green:0, blue:0});
	const weights = getMix(colors, wantedColor, {maxColors:maxColors.value, maxRatio:maxRatio.value });
	return <div>

		<ConfigContainer>
			<label>Max colors: {maxColors.value}</label>
			<input type="range" min={1} max={5} {...maxColors}/>
			<label>Max ratio: {maxRatio.value}</label>
			<input type="range" min={1} max={4} {...maxRatio}/>
		</ConfigContainer>

		<label>Expected color:</label>
		<ColorSelect color={wantedColor} onColorChange={setWantedColor}/>

		<label>Obtained color:</label>
		<ColorSelect color={mixColors(colors, weights)}/>

		<br/>
		<br/>
		<label>Combination:</label>
		<CombinationContainer>
			{weights.map((w, i) => w ? <CombinationItem>
				<ColorSelect key={i} color={colors[i]}/>
				x{w}
			</CombinationItem> : null)}
		</CombinationContainer>
	</div>;
};

export default ColorMix;