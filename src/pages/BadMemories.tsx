import React, {useContext} from "react";
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
  IonCol
} from "@ionic/react";

import { add } from "ionicons/icons";
import Fab from "../components/Fab";
import MemoriesList from '../components/MemoriesList';

import MemoriesContext from '../data/memories-context';

const BadMemories: React.FC = () => {
  const memoriesCtx = useContext(MemoriesContext);
  const badMemories = memoriesCtx.memories.filter(mem=> mem.type === 'bad');
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bad Memories</IonTitle>
          {isPlatform("ios") && (
            <IonButtons slot="end">
              <IonButton routerLink="/new-memory">
                <IonIcon slot='icon-only' icon={add} />
              </IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonGrid>
          {badMemories.length === 0 && (
            <IonRow className="ion-text-center">
              <IonCol>
                <h2>No Bad memories found</h2>
              </IonCol>
            </IonRow>
          )}
          {!!badMemories.length &&
            <MemoriesList memories={badMemories} />
           }
        </IonGrid>
        {!isPlatform("ios") && <Fab link="/new-memory" />}
      </IonContent>
    </IonPage>
  );
};

export default BadMemories;
