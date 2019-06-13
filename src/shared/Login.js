import React from 'react';

const Login = ({ loginWithGoogle, loginWithEmail }) => {
	return (
		<div className="Login">
			<div className="logo">
				<i className="fas fa-people-carry" /> Share
			</div>

			<div className="middletext">
				<p className="happy">LIVET ÄR SOM EN BOK</p>
				<p className="fear">du kan inte ändra de sidor<br /> som redan är skrivna</p>
				<p className="jumble">men du kan börja <br />på ett nytt kapitel</p>
			</div>

			<div>
				<button className="second" onClick={loginWithGoogle}>Login med google</button>
				<br />
				<button className="therd" onClick={loginWithEmail}><strike>Login med email</strike></button>
			</div>
		</div>
	);
};

export default Login;