import React, { } from 'react';
import {Comment,Rating} from 'semantic-ui-react'
const SingleComment=(props)=>{
    return (
        <div>
            <Comment>
                <Comment.Avatar src={props.avatar} />
                <Comment.Content>
                    <Comment.Author as='a'>{props.email}</Comment.Author>
                    <Comment.Metadata>
                        <div><Rating icon='star'  maxRating={5} rating={props.rate} disabled/></div>
                        {/* <div>
                            <Icon name='star' />5 Faves
                        </div> */}
                    </Comment.Metadata>
                    <Comment.Text>
                        {props.content}
                    </Comment.Text>
                    <Comment.Actions>
                        <Comment.Action></Comment.Action>
                    </Comment.Actions>
                </Comment.Content>
            </Comment>
        </div>
    );
}

export default SingleComment;