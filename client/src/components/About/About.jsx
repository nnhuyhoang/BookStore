import React from 'react'
import CardContent from "./CardContent"
import { Card, Icon, Image } from 'semantic-ui-react'
import "./style.css"

const description = [
    'Amy is a violinist with 2 years experience in the wedding industry.',
    'She enjoys the outdoors and currently resides in upstate New York.',
  ].join(' ')
export const About=()=>{
    return (
        <div>
            <div id='body'>
                <CardContent 
                    className='sectionAbout'
                    img='./Capture1.PNG'
                    title='About the Company' 
                    description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur.'
                />

                <CardContent 
                    className='sectionAbout bg-grey'
                    img='./Capture3.PNG' 
                    title='Our Values'
                    description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur.'
                />

                <CardContent 
                    className='sectionAbout'
                    img='./Capture1.PNG' 
                    title='Our Mission' 
                    description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur.'
                />
            </div>
            <div className="reviewHeader">
                <h2>Review about us</h2>
                <hr/>
            </div>
            <div className="CardContainer">
                <Card.Group itemsPerRow={3}>
                    <Card>
                        <Card.Content>
                            <Image
                            floated='right'
                            size='mini'
                            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                            />
                            <Card.Header>Steve Sanders</Card.Header>
                            <Card.Meta>Friends of Elliot</Card.Meta>
                            <Card.Description>{description}</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Icon name='user' />4 Friends
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Image
                            floated='right'
                            size='mini'
                            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                            />
                            <Card.Header>Steve Sanders</Card.Header>
                            <Card.Meta>Friends of Elliot</Card.Meta>
                            <Card.Description>{description}</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Icon name='user' />4 Friends
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Image
                            floated='right'
                            size='mini'
                            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                            />
                            <Card.Header>Steve Sanders</Card.Header>
                            <Card.Meta>Friends of Elliot</Card.Meta>
                            <Card.Description>{description}</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Icon name='user' />4 Friends
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Image
                            floated='right'
                            size='mini'
                            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                            />
                            <Card.Header>Steve Sanders</Card.Header>
                            <Card.Meta>Friends of Elliot</Card.Meta>
                            <Card.Description>{description}</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Icon name='user' />4 Friends
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Image
                            floated='right'
                            size='mini'
                            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                            />
                            <Card.Header>Steve Sanders</Card.Header>
                            <Card.Meta>Friends of Elliot</Card.Meta>
                            <Card.Description>{description}</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Icon name='user' />4 Friends
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Image
                            floated='right'
                            size='mini'
                            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                            />
                            <Card.Header>Steve Sanders</Card.Header>
                            <Card.Meta>Friends of Elliot</Card.Meta>
                            <Card.Description>{description}</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Icon name='user' />4 Friends
                        </Card.Content>
                    </Card>
                    
                </Card.Group>
            </div>
        </div>
    )
}

export default About
