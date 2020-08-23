import React, { useContext } from "react";

import MemoriesContext from "../data/memories-context";
import MemoriesContent from "../components/MemoriesContent";

const BadMemories: React.FC = () => {
  const memoriesCtx = useContext(MemoriesContext);
  const badMemories = memoriesCtx.memories.filter((mem) => mem.type === "bad");
  return (
    <MemoriesContent
      title="Bad Memories"
      memories={badMemories}
      fallbackMessage="No bad memories found"
    />
  );
};

export default BadMemories;
