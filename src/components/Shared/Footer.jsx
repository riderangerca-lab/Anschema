import React from "react";
export default function Footer(){
  return (
    <footer style={{background:"#667eea",color:"#fff",padding:"1rem",marginTop:"auto"}}>
      <div className="container"> {new Date().getFullYear()} Anschema</div>
    </footer>
  );
}
