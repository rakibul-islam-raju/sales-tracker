import { useEffect } from "react";
import Router from "./router";
import { useDispatch, useSelector } from "react-redux";
import { tokenUpdate } from "./redux/actions/userActions";

const App = () => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		console.log("useEffect =>");
		const cleanUp = setInterval(() => {
			if (userInfo.refresh) {
				console.log("useEffect 22 =>");
				dispatch(tokenUpdate());
			}
			// }, 2000);
		}, 600000);
		// cleanUp setInverval
		return () => clearInterval(cleanUp);
	}, [dispatch, userInfo]);

	return (
		<>
			<Router />
		</>
	);
};

export default App;
