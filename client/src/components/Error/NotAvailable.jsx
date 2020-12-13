
import React from 'react';

import { withRouter } from 'react-router-dom'
const NotAvailable =()=>{

        /* useEffect(() => {  
            console.log("im in use");
            
            return () => {
                console.log("clean Home");
                
            };
        }, []) */
        /* console.log(props);
         */
        
        return (
                <div style={{width: "100%",textAlign: "center"}}>
                    <h1>Not Item Available Yet</h1>
                </div>    
                );
}


export default withRouter(React.memo(NotAvailable));
