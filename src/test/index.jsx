import React, {useEffect} from "react";
import {useHistory} from 'react-router-dom'
import MaterialButton from '@material-ui/core/Button'

export default function Index() {
	const history = useHistory()

	useEffect(() => {
		console.log("window.location.state: ", window.location.state)
	}, [])

	return (
		<div>
			<h1>Test Page</h1>
			<MaterialButton
				variant="contained"
				onClick={
					() => {
						history.push("/test2", { some: 'state from test1' })
					}
				}
			>
				go to test2
			</MaterialButton>
		</div>
	);
}
