const WeightSelect = ({weight, onChange, onDelete}) => {
	return <div>
		{weight === 0 && <button onClick={onDelete}>Delete</button>}
		{weight !== 0 && <button onClick={onChange(weight-1)}>-</button>}
		{weight}
		<button onClick={onChange(weight+1)}>+</button>
	</div>;
};

export default WeightSelect;