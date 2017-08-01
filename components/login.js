import React from 'react'
import axios from 'axios';
import { Route, Redirect , Link } from 'react-router';
class login extends React.Component{

	constructor(props){
		super(props)
		this.state={
			isLogin:true,
			isRegister:false,
			file:null
		}

		this.getLoginType=this.getLoginType.bind(this);
		this.submitRegistration=this.submitRegistration.bind(this);	
		this.submitLogin=this.submitLogin.bind(this);	
		this.getUserImage=this.getUserImage.bind(this);	
	}

	getUserImage(e){
		this.setState({file: e.target.files[0]});
	}

	getLoginType(e){
		if(e.target.value==='register'){
			this.setState({
				isLogin:false,
				isRegister:true		
			});
		}else{
			this.setState({
				isLogin:true,
				isRegister:false		
			})
		}
	}

	submitRegistration(e){
		e.preventDefault();
		let data = new FormData();
            data.append('file', this.state.file);
		let registerObj={
			name:this.refs.userName.value,
			emailId:this.refs.email.value,
			password:this.refs.password.value,
			image:data
		}
		axios.post('http://localhost:3000/upload',registerObj.image).then(result => {
			registerObj.dp=result.data.filename;
		axios.post('http://localhost:3000/addUser',registerObj)
        	.then(res => {
        		alert('successfullyCreated');
        	});
      });	
	}
	submitLogin(e){
		e.preventDefault();
		
		let loginObj={
			emailId:this.refs.loginEmail.value,
			password:this.refs.loginPassword.value
		}
		 axios.post('http://localhost:3000/userLogin',loginObj)
        	.then(res => {
        	if(res.data.length!=0){
        		let sessionObj={
        			id:res.data[0]._id,
        			name:res.data[0].user.name,
        			dp:res.data[0].user.dp
        		}
        		console.log('ses '+sessionObj);
        		sessionStorage.setItem('userSession',JSON.stringify(sessionObj));
        		window.location='/#/home';		
        		
        	}else{
        		alert('invalid Credentials');
        	}
        	
      });	

	}

	render(){
		return(
			<div className="login">

			<form className="radio-form">
			Login : <input type="radio" name="loginType" value="login" checked={this.state.isLogin} onChange={this.getLoginType} />
			Register : <input type="radio" name="loginType" value="register" onChange={this.getLoginType} />
			</form>
			{this.state.isRegister ? (
			<h1 className="login-heading">
			User Registration
			</h1>
			):<h1 className="login-heading"> User Login</h1>}
			{this.state.isRegister ? (
			<form className="form" onSubmit={this.submitRegistration}>
				<table>
					<tbody>
						<tr>
							<td>
								<label>User Name</label>
							</td>
							<td>
								<input type="text" name="userName" placeholder="name" ref="userName"/>
							</td>
						</tr>
						<tr>
							<td>
								<label>Email Id</label>
							</td>
							<td>
								<input type="email" name="userEmail" placeholder="Email Id" ref="email"/>
							</td>
						</tr>
						<tr>
							<td>
								<label>Set Password</label>
							</td>
							<td>
								<input type="password" name="userPassword" placeholder="Password" ref="password"/>
							</td>
						</tr>
						<tr>
							<td>
								<label>Photo</label>
							</td>
							<td>
								<input type="file" name="file" onChange={this.getUserImage}  />
							</td>
						</tr>
						<tr>
							<td colSpan={2}>
								<input className="submit" type="submit" value="Register"/>
							</td>
							</tr>
						</tbody>
					</table>
			</form>
			): 
		<form className="form" onSubmit={this.submitLogin}>
				<table>
					<tbody>
						
						<tr>
							<td>
								<label>Email Id</label>
							</td>
							<td>
								<input type="email" name="loginEmail" placeholder="Email Id" ref='loginEmail'/>
							</td>
						</tr>
						<tr>
							<td>
								<label>Password</label>
							</td>
							<td>
								<input type="password" name="loginPassword" placeholder="Password" ref='loginPassword'/>
							</td>
						</tr>
						
						<tr>
							<td colSpan={2}>
								<input className="submit" type="submit" value="Login"/>
							</td>
							</tr>
						</tbody>
					</table>
			</form>}
			</div>
			);

	}

}

export default login;