import React, { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonBackButton,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

import MemoriesContext from "../data/memories-context";
import ImagePicker, {Photo} from "../components/ImagePicker";


const NewMemory: React.FC = () => {
  const [takenPhoto, setTakenPhoto] = useState<Photo>();
  const [selectedMemoryType, setSelectedMemoryType] = useState<"good" | "bad">(
    "good"
  );
  const titleRef = useRef<HTMLIonInputElement>(null);
  const history = useHistory();
  const memoriesCtx = useContext(MemoriesContext);

  const imagePickHandler = (image: Photo) => {
    setTakenPhoto(image);
  };

  const saveMemoryHandler = async () => {
    const enteredTitle = titleRef.current!.value;

    if (
      !enteredTitle ||
      enteredTitle.toString().trim().length === 0 ||
      !takenPhoto ||
      !selectedMemoryType
    ) {
      return;
    }

    memoriesCtx.addMemory(
      enteredTitle.toString(),
      takenPhoto,
      selectedMemoryType
    );
    setTakenPhoto({ path: undefined, preview: "" });
    titleRef.current!.value = "";
    if (history.length > 0) {
      history.goBack();
    } else {
      history.replace("/good-memories");
    }
  };

  const selectMemoryHandler = (event: CustomEvent) => {
    setSelectedMemoryType(event.detail.value);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton>
              <IonBackButton defaultHref="/good-memories" />
            </IonButton>
          </IonButtons>
          <IonTitle>New Memories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Memory title</IonLabel>
                <IonInput ref={titleRef} type="text"></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonSelect
                value={selectedMemoryType}
                onIonChange={selectMemoryHandler}
              >
                <IonSelectOption value="good">Good Memory</IonSelectOption>
                <IonSelectOption value="bad">Bad Memory</IonSelectOption>
              </IonSelect>
            </IonCol>
          </IonRow>
          <IonRow className="ion-text-center">
            <IonCol>
              <ImagePicker onImagePick={imagePickHandler} />
            </IonCol>
          </IonRow>
          <IonRow className="ion-margin-top">
            <IonCol className="ion-text-center">
              <IonButton onClick={saveMemoryHandler}>
                <IonLabel>Save Memory</IonLabel>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default NewMemory;
