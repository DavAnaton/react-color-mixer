import styled from 'styled-components';

const ColorSelectContainer = styled.div`
	display: flex;
	flex-direction: row;
`;
const CursorsContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	padding: 15px;
`;
const ColorViewer = styled.div`
		width: 100px;
		height:100px;
		border: 1px solid black;
		border-radius: 12px;
		background: rgb(${props=>props.red}, ${props=>props.green}, ${props=>props.blue});
`;


const ColorSelect = ({
	color={},
	onColorChange
}) => {
	const onChange = component => event => {
		onColorChange && onColorChange({...color, [component]: parseInt(event.target.value)});
	}

	const parseColor = e => {
		let colorCode = e.target.value;
		let colors = colorCode.split(',').map(i => parseInt(i.replace('{', '')));
		if(colors.length !== 3 ) return;
		else onColorChange({red: colors[0] || 0, green: colors[1] || 0, blue: colors[2] || 0});
	}

	return <ColorSelectContainer>
		<ColorViewer {...color}/>

		<CursorsContainer>
			{['red', 'green', 'blue'].map(component => 
				<span key={component}>
					<input type="range" min={0} max={255} disabled={!onColorChange} value={color[component]} onChange={onChange(component)}/>
					{color[component]}
				</span>
			)}
		</CursorsContainer>	
		<input onChange={parseColor}/>
	</ColorSelectContainer>

};

export default ColorSelect;