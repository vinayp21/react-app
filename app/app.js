import React from 'react';
import './assets/styles.scss';
import Post from '../components/post';
import axios from 'axios';
import { addPost, postImage, getStores, deleteUserPost } from './api';
class App extends React.Component {

   constructor(props){
      super(props);
      this.submitPost=this.submitPost.bind(this);
      this.submitImagePost=this.submitImagePost.bind(this);
      this.uploadPost=this.uploadPost.bind(this);
      this.state={
        file:null,
        details:[],
        dp:""
      }
   }
   componentWillMount(){
    var userData=JSON.parse(sessionStorage.getItem('userSession'));
      if(!userData){
        window.location='/#/';
      }else{
        this.setState({dp:"app/assets/img/"+userData.dp});
      }
   }
   uploadPost(e){
    this.setState({file: e.target.files[0]});
   }
   deleteHandler(data){
    if(confirm('Are you sure you want to delete the post?')){
      let userData=JSON.parse(sessionStorage.getItem('userSession'));
      let obj={
        id:userData.id,
        postId:data.postId
      }
      deleteUserPost(obj).then((res) => {
        if(res.data.nModified){
          getStores().then(postData => {
            this.setState({details: postData.data});
        });
        }else{
          alert('Couldn\'t Delete');
        }
      });
    };
   }
   submitImagePost(){
    let data= new FormData();
    data.append('file', this.state.file);
    var userData=JSON.parse(sessionStorage.getItem('userSession'));
         let obj={
            id:userData.id,
            postId:(Math.random()*100000).toFixed(0).toString(),
            contentType:'image',
            date:Date()
         }
         
         postImage(data).then((result)=>{
          obj.content=result.data.filename;
           addPost(obj).then((res)=>{
             getStores().then(postData => {
               this.setState({details:postData.data});
             });
          });
        });
   }
   submitPost(e){
      if (e.charCode == 13) {
        var userData=JSON.parse(sessionStorage.getItem('userSession'));
         let obj={
            id:userData.id,
            postId:(Math.random()*100000).toFixed(0).toString(),
            contentType:'text',
            content:e.target.value,
            date:Date()
         }
         addPost(obj).then((res)=>{
          alert('Success');
         });
      }
   }
   componentDidMount() {
     getStores().then(data => {
      this.setState({details:data.data});
      console.log(this.state.details);
     });
  }
   render() {
    let userData=JSON.parse(sessionStorage.getItem('userSession'));
        //alert("userData.dp");
      return (
      	<section className="post">
        <div id = "post">
        <div className="addPost">
        <img className="post-dp" src={this.state.dp} width="50" height="50" alt="Profile"/>
         <input type="text" name="status" placeholder="Whats on your mind...?" onKeyPress={this.submitPost}/>
         <input type="file" name="file" onChange={this.uploadPost} />
         <button onClick={this.submitImagePost}>Post</button>
        </div>
        {this.state.details.map((row, i) => row.user.userPost.map((post,j) => <Post deletePost={this.deleteHandler.bind(this,post)} id={row._id} name={row.user.name} dp={row.user.dp} key = {j} data = {post} />))}
         </div>
         </section>
      );
   }
}

export default App;