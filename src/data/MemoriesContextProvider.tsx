import React, { useState, useCallback, useEffect } from "react";
import { Plugins, Filesystem, FilesystemDirectory } from "@capacitor/core";
import { base64FromPath } from "@capacitor-community/react-hooks/filesystem";

import MemoriesContext, { Memory, MemoryType } from "./memories-context";
import { Photo } from "../components/ImagePicker";

const { Storage } = Plugins;
const MemoriesContextProvider: React.FC = (props) => {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    const memoriesToStore = memories.map((mem) => ({
      id: mem.id,
      title: mem.title,
      imagePath: mem.imagePath,
      type: mem.type,
    }));
    Storage.set({
      key: "memories",
      value: JSON.stringify(memoriesToStore),
    });
  }, [memories]);

  const addMemory =async (
    title: string,
    takenPhoto: Photo,
    type: MemoryType
  ) => {
    const filePath = new Date().getTime() + ".jpeg";
    const base64 = await base64FromPath(takenPhoto.preview);
    await Filesystem.writeFile({
      path: filePath,
      data: base64,
      directory: FilesystemDirectory.Data,
    });
    const newMemory: Memory = {
      id: Math.random().toString(),
      title,
      imagePath: filePath,
      type,
      base64Url: base64,
    };
    setMemories((currentMemories) => [...currentMemories, newMemory]);
  };

  const initContext = useCallback(async () => {
    const savedMemoriesString = await Storage.get({ key: "memories" });
    //check if memories already exist, if not set saved Memories to an empty array to avoid runtime errors
    const savedMemories = !!savedMemoriesString.value
      ? JSON.parse(savedMemoriesString.value)
      : [];
    const loadedMemories: Memory[]  = [];
    for (const memory of savedMemories) {
      const file = await Filesystem.readFile({
        path: memory.imagePath,
        directory: FilesystemDirectory.Data,
      });
      const base64: string = 'data:image/jpeg;base64,' + file.data;
      memory.base64Url = base64; 
      loadedMemories.push(memory);
    }
    setMemories(loadedMemories);
  }, []);

  return (
    <MemoriesContext.Provider
      value={{
        memories,
        addMemory,
        initContext,
      }}
    >
      {props.children}
    </MemoriesContext.Provider>
  );
};

export default MemoriesContextProvider;
