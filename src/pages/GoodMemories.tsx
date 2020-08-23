import React, { useContext } from "react";

import MemoriesContext from "../data/memories-context";
import MemoriesContent from "../components/MemoriesContent";

const GoodMemories: React.FC = () => {
  const memoriesCtx = useContext(MemoriesContext);
  const goodMemories = memoriesCtx.memories.filter(
    (mem) => mem.type === "good"
  );
  return (
    <MemoriesContent
      title="Good Memories"
      memories={goodMemories}
      fallbackMessage="No good memories found"
    />
  );
};

export default GoodMemories;
