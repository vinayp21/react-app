import React from 'react';
import Postreaction from './PostReaction';

import { getStores, deleteUserPost } from '../app/api';
class Post extends React.Component {

	constructor(props){
		super(props);
		this.state={
			commentData:[]
		};
		this.deletePost=this.deletePost.bind(this);
	}
	deletePost(){
		if(confirm('Are you sure you want to delete the post?')){
			let userData=JSON.parse(sessionStorage.getItem('userSession'));
			let obj={
				id:userData.id,
				postId:this.props.data.postId
			}
			deleteUserPost(obj).then((res) => {
				if(res.data.nModified){
					alert('Post deleted');
				}else{
					alert('Couldn\'t Delete');
				}
			});
		};
	}

	componentWillMount(){
	 	console.log(this.props.data);
	 	let userComments= this.props.data.comments.map(d => {
	 		return {
	 			userName:d.commentUserName,
	 		 	Comment:d.comment, 
	 		 	valueDate:d.date,
	 		 	dp:d.commentUserDp
	 		 };
	 		 });
	 	this.setState({commentData:userComments});
	}
	
	render(){
		let userData=JSON.parse(sessionStorage.getItem('userSession'));
		return(
			<div className="post-info">
				<img className="post-dp" src={"app/assets/img/"+this.props.dp} width="50" height="50" alt="Profile"/>
				<div className="user-time">
				<p>{this.props.name}</p>
				<p>{this.props.data.datetime}</p>
				</div>
				<div className="delete-post" onClick={this.props.deletePost}>{(this.props.id===userData.id)? 'X': ''}</div>
				<div className="clear"></div>
				<div className="post-content">
					<div className="post-desc">
						<b>#FBpost</b>
					</div>
					 <img className="post-image" src={"app/assets/img/posts/"+this.props.data.content}  height="500" alt="post"/>
				</div>
					<Postreaction 
					likesCount={this.props.data.likes}
					comments={this.state.commentData}
					postId={this.props.data.postId}
					likesBy={this.props.data.likesBy}
					/>
			</div>
			);
	}

}

export default Post;