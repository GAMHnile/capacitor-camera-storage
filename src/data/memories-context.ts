import { createContext } from "react";

export interface Memory {
  id: string;
  title: string;
  imagePath: string;
  type: "good" | "bad";
  base64Url: string;
}

const MemoriesContext = createContext<{
  memories: Memory[];
  addMemory: (
    title: string,
    base64Url: string,
    imagePath: string,
    type: "good" | "bad"
  ) => void;
  initContext: ()=> void;
}>({
  memories: [],
  addMemory: () => {},
  initContext: ()=>{}
});

export default MemoriesContext;
