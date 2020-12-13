import React, { useState,useEffect,useRef } from 'react'
import { Link, withRouter,Redirect } from 'react-router-dom';
import {useSelector,useDispatch} from "react-redux"
import * as ReviewActions from "./../actions/reviews"
import { Rating,Button, Comment, Form, Header,Message,Icon } from 'semantic-ui-react'
import _ from "lodash"
const LeaveReview=(props)=>{
    //state:
    //0: not login
    //1: login but dont have comment yet
    //2: login and already have comment before
    const [State,setState]=useState(0)
    const [Data,setData]=useState({
        comment: "",
        rate: 3,
        id: ""
    })
    const [isUpdate,setIsUpdate]=useState(false)
    const auth=useSelector(state=>state.auth)
    const reviews=useSelector(state=>state.reviews)
    const dispatchReview=useDispatch()

    const checkRender=async ()=>{
    
        if(auth.isAuthenticated){
            const reviewList=await dispatchReview(ReviewActions.getReviewsByBookId(props.bookId))
            const checkReview=_.findIndex(reviewList.data.commentList,function(o){return o.user._id===auth.profile.id})
            if(checkReview>=0){

                setState(2)
                setData({
                    comment:reviewList.data.commentList[checkReview].content,
                    rate:reviewList.data.commentList[checkReview].rate,
                    id: reviewList.data.commentList[checkReview]._id
                })
                return
            }
            setState(1)
            return
        }
        return
    }
    const handleAddReview=async ()=>{
        if(isUpdate){
            const data={content: Data.comment,rate: Data.rate, bookId: props.bookId,reviewId: Data.id}
            await dispatchReview(ReviewActions.updateReviewById(data))
            setState(2)
            return 
        }
        const data={content: Data.comment,rate: Data.rate, bookId: props.bookId,userId: auth.profile.id}
        const ret=await dispatchReview(ReviewActions.createReview(data))
        setData({...Data,id:ret.data._id})
        setState(2)

        
    }
    const handleUpdate=()=>{

        setState(1)
        setIsUpdate(true)
    }
    const handleDelete=async ()=>{
        const ret=await dispatchReview(ReviewActions.deleteReviewById(Data.id))
        if(ret.status){
            setData({
                comment: "",
                rate: 3,
                id: ""
            })
            setState(1)
            setIsUpdate(false)
        }
    }
    useEffect(() => {    
        checkRender()
        return () => {
            console.log("clean up Leave COmment");
            
        }
    }, [])

    if(State===0){
        return (
            <div className="UserReviewContent">
                <Header as='h3'>
                    Your Rating
                </Header>
                <Message style={{marginTop: "20px",width:"100%"}}
                    color='brown'
                    attached='bottom'>
                    <Icon name='help'/>
                    Please <a href='/login'>Login</a> to leave your Review.
                </Message>
            </div>
        )
    }
    else if(State===2){
        return (
            <div className="UserReviewContent">
                <Header as='h3'>
                    Your Rating
                </Header>
                <Message style={{marginTop: "20px",width:"100%"}}
                    color='blue'
                    attached='bottom'>
                    You already have review for this Product. Do you want to modify it ?
                    
                </Message>
                <Button style={{alignSelf: "center"}} color='blue'onClick={handleUpdate}>Update Review</Button>
                <Button style={{alignSelf: "center"}} color='red'onClick={handleDelete}>Delete Review</Button>
            </div>
            
        )
    }
    else{
        return (
            <div className="UserReviewContent">
                <Header as='h3'>
                    Your Rating
                </Header>
                <div className="UserRating">
                    <Rating style={{margin: "auto"}} icon='star' maxRating={5} defaultRating={Data.rate} size='massive'
                    onRate={(e,{rating,maxRating})=>{setData({...Data,rate:rating})}}/>      
                </div>

                <div className="UserComment">
                <h3>What do you think about this product ?</h3>
                <Form>
                    <Form.TextArea style={{height: "250px"}} value={Data.comment} onChange={e=>setData({...Data,comment:e.target.value})}/>
                    <Button content='Add Review' labelPosition='left' icon='edit' primary onClick={handleAddReview}/>
                    {isUpdate?<Button style={{alignSelf: "center"}} color='grey'onClick={()=>setState(2)}>Go Back</Button>:null}
                </Form>
                </div>
            </div>
        )
    }
}
export default LeaveReview