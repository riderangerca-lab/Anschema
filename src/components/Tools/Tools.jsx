import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import LLMCalculator from "./LLMCalculator/LLMCalculator";
export default function Tools(){
  return (
    <div className="container">
      <h1>Tools</h1>
      <Routes>
        <Route path="/" element={<ul><li><Link to="llm-calculator">LLM Calculator</Link></li></ul>} />
        <Route path="llm-calculator" element={<LLMCalculator />} />
      </Routes>
    </div>
  );
}
