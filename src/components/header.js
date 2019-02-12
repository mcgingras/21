import React from 'react';

const Header = ( {title, path} ) => {

  const HeaderStyle = {
    backgroundColor: "#000",
    color: "#FDFDFD",
    textAlign: "center",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }

  return (
    <div style={HeaderStyle} className="header">
      <a href={path} style={{color: "black", fontSize: ".8rem"}}>Back</a>
      {title}
      <a href="/signup" style={{color: "black", fontSize: ".8rem"}}>Add</a>
    </div>
  )
}

export default Header;
