import { createContext } from "react";
import { Photo } from "../components/ImagePicker";

export type MemoryType = "good" | "bad";
export interface Memory {
  id: string;
  title: string;
  imagePath: string;
  type: MemoryType;
  base64Url: string;
}

const MemoriesContext = createContext<{
  memories: Memory[];
  addMemory: (
    title: string,
    takenPhoto: Photo,
    type: MemoryType
  ) => void;
  initContext: ()=> void;
}>({
  memories: [],
  addMemory: () => {},
  initContext: ()=>{}
});

export default MemoriesContext;
