import React, { useContext } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  isPlatform,
  IonButtons,
  IonIcon,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { add } from "ionicons/icons";

import MemoriesContext from "../data/memories-context";
import MemoriesList from "../components/MemoriesList";
import Fab from "../components/Fab";

const GoodMemories: React.FC = () => {
  const memoriesCtx = useContext(MemoriesContext);
  const goodMemories = memoriesCtx.memories.filter(mem=> mem.type === 'good');
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Good Memories</IonTitle>
          {isPlatform("ios") && (
            <IonButtons slot="end">
              <IonButton routerLink="/new-memory">
                <IonIcon slot="icon-only" icon={add} />
              </IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          {goodMemories.length === 0 && (
            <IonRow className="ion-text-center">
              <IonCol>
                <h2>No good memories found</h2>
              </IonCol>
            </IonRow>
          )}
          {!!goodMemories.length &&
            <MemoriesList memories={goodMemories} />
           }
        </IonGrid>
        {!isPlatform("ios") && <Fab link="/new-memory" />}
      </IonContent>
    </IonPage>
  );
};

export default GoodMemories;
