import React from 'react';
import { Link } from "react-router-dom";

const Temp = (props) => {	
	return (
		<div className="Temp">
			Temp admin works<br />
			Currently testing nested routing...<br />
			<Link to="/temp/testing">testing</Link><br />
			<Link to="/temp/magic">magic</Link><br />
			{(props.match === null) ? null : props.match.params.magicURL}
		</div>
	);
}

export default Temp;
