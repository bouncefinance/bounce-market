import React, {useEffect} from "react";
import {useLocation} from 'react-router-dom'

export default function Index() {

	const {state} = useLocation();

	useEffect(() => {
		console.log("state.some: ", state.some)
	}, [state])

	return (
		<div>
			<h1>Test Page 2</h1>

			{
				state && <h3>{state.some}</h3> 
			}
		</div>
	);
}
