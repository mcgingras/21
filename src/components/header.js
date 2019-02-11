import React from 'react';

const Header = ( {title, path} ) => {

  const HeaderStyle = {
    borderBottom: "2px solid black",
    textAlign: "center",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }

  return (
    <div style={HeaderStyle}>
      <a href={path} style={{color: "black", fontSize: ".8rem"}}>Back</a>
      {title}
      <a href="/signup" style={{color: "black", fontSize: ".8rem"}}>Add</a>
    </div>
  )
}

export default Header;
