import React,{useState,useEffect} from 'react';
import {useSelector} from "react-redux"
import { Header, Comment} from 'semantic-ui-react'
import SingleComment from "./SingleComment"
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const CommentList=(props)=>{
    const reviews=useSelector(state=>state.reviews)
    const renderComment=()=>{
        return reviews.commentList.map((review,index)=>{
            return  <SingleComment
            key={index+1}
            avatar={review.user.avatar}
            email={review.user.email}
            rate={review.rate}
            content={review.content}
            >
            </SingleComment>
        })
    }
    console.log(reviews);
    
    console.log("render Comment list");
    
    return (
        <Comment.Group size='large'>
            <Header as='h3'>
            Customer Reviews
            </Header>
        
            <SimpleBar style={{height: '500px'}}>
                {renderComment()}
            </SimpleBar>
        </Comment.Group>
    )

}


  export default CommentList