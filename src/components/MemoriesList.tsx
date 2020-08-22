import React from "react";
import MemoryItem from "./MemoryItem";

import { Memory } from "../data/memories-context";

const MemoriesList: React.FC<{ memories: Memory[] }> = (props) => {
  return (
    <React.Fragment>
      {props.memories.map((memory) => (
        <MemoryItem key={memory.id} memory={memory} />
      ))}
    </React.Fragment>
  );
};

export default MemoriesList;
