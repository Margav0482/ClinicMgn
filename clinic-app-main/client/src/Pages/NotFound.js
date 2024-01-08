import React from "react";

const NotFound = () => {
    return(
        <div className="flex-column" style={{paddingTop:"100px",margin:"auto",paddingLeft:"500px"}}>
            <div style={{paddingLeft:"100px",fontSize:"200px",fontWeight:"bold"}}>404</div>
            <div style={{fontSize:"30px",fontWeight:"bold",marginLeft:"160px",paddingBottom:"10px"}}>Page Not Found</div>
            <div style={{fontSize:"20px",paddingLeft:"20px",paddingBottom:"200px"}}>The Resource requested could not be found on this server!</div>
        </div>
    )
}

export default NotFound;