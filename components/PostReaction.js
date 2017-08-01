import React from 'react';
import  { addComment, addLike } from '../app/api';
class Postreaction extends React.Component{

	constructor(props){
		super(props);
		this.state={
			likesCount:this.props.likesCount,
			isCommentSection:false,
			commentInput:'',
			likeFlag:0
		};
		this.updateLikes= this.updateLikes.bind(this);
		this.updateComment= this.updateComment.bind(this);
		this.displayComments= this.displayComments.bind(this);
		this.submitComment= this.submitComment.bind(this);
	};
	submitComment(e){
		console.log(this.props.data)
		if(e.key=='Enter'){
			let userData=JSON.parse(sessionStorage.getItem('userSession'));
			let obj={
				userId:userData.id,
				userName: userData.name,
				comment: this.state.commentInput,
				userDp:userData.dp,
				postId:this.props.postId.toString(),
				date:Date()
			};
			let comment={
					userName: userData.name,
					Comment: this.state.commentInput,
					valueDate: Date().toString(),
					dp:userData.dp
			};
			addComment(obj).then(res => {
				if(res.data==='success'){
					this.props.comments.push(comment);	
					this.setState({commentInput:''});
				}
			});
			
		}

	}
    updateComment(e){
    	this.setState({commentInput:e.target.value});
    }
	updateLikes(){
		let userData=JSON.parse(sessionStorage.getItem('userSession'));
		let count=this.state.likesCount;
		if(this.state.likeFlag){
			count++;
		
		let obj={
				userId:userData.id,
				userName: userData.name,
				userDp:userData.dp,
				postId:this.props.postId.toString(),
				likes:count
			};
		addLike(obj).then(res => {
				if(res.data==='success'){
					this.setState({likesCount:count});
					this.setState({likeFlag:0});
				}
			});
	}
	}
	componentWillMount(){
		let userData=JSON.parse(sessionStorage.getItem('userSession'));
		let likeValidation = this.props.likesBy.map(d => d.likedUserId===userData.id)
		if(likeValidation.indexOf(true)===-1){
			this.setState({likeFlag:1});
		}
	}
	displayComments(){
		this.setState({isCommentSection:true});
	}

	render(){
		let userData=JSON.parse(sessionStorage.getItem('userSession'));
		
		return (

			<div className="post-reaction">
			<div className="reaction-stats">
				<span>{this.state.likesCount} Likes</span>
				<span className="comments-count">{this.props.comments.length} Comments</span>
			</div>
			<div className="reaction-options">
				<span className={this.state.likeFlag? "post-like" : "liked"}><a  onClick={this.state.likeFlag? this.updateLikes: ''}>Like</a></span>
				<span className="post-comment"><a onClick={this.displayComments}>Comment</a></span>
				<span className="post-share"><a>Share</a></span>
			</div>
			{this.state.isCommentSection ? (
				<div className="comment-section">
				<img className="user-dp" src={"app/assets/img/"+userData.dp} width="50" height="50" alt="Profile" />
				<input className="user-comments" type="text" value={this.state.commentInput} onChange={this.updateComment} onKeyPress={this.submitComment} name="comment" placeholder="Write a comment.."/>
				<div className="clear"></div>
				{this.props.comments.map((data,i) => 
				<div key={i}className="post-comments">
					<img className="user-dp" src={"app/assets/img/"+data.dp} width="50" height="50" alt="Profile" />
					<span><b>{data.userName}</b>{data.Comment}</span>
					<span>{data.valueDate}</span>

				</div>
				)}
			</div>	
			):<div></div> }
			
			</div>	
		)
		
	}

};

export default Postreaction;