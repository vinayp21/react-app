import axios from 'axios';

export const getStores=() => {
	return axios.get('http://localhost:3000/getPosts')
      .then(res => res);	
  };

  export const addPost=(postData) => {
  	return axios.post('http://localhost:3000/addPost',postData).then((res) => res);
  }
  export const addComment =(commentData)=>{
  	return axios.post('http://localhost:3000/addComment',commentData).then((res) => res);	
  }

export const addLike =(likeData)=>{
  	return axios.post('http://localhost:3000/addLike',likeData).then((res) => res);	
  }
  export const postImage = postImage =>{
    return axios.post('http://localhost:3000/uploadPost',postImage).then((res) => res); 
  }
   export const deleteUserPost = deleteUserPost =>{
    return axios.post('http://localhost:3000/deletePost',deleteUserPost).then((res) => res); 
  }