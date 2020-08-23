import React from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    isPlatform,
    IonGrid,
    IonRow,
    IonCol,
  } from "@ionic/react";
  import { add } from "ionicons/icons";

import MemoriesList from "../components/MemoriesList";
import FixedBottomFab from "./FixedBottomFab";

import {Memory} from '../data/memories-context';
import ToolbarAddButton from './ToolbarAddButton';

const MemoriesContent: React.FC<{
    memories: Memory[];
    title: string;
    fallbackMessage: string;
}> = props =>{
    return (
        (
            <IonPage>
              <IonHeader>
                <IonToolbar>
                  <IonTitle>{props.title}</IonTitle>
                  {isPlatform("ios") && <ToolbarAddButton link="/new-memory" icon={add} />}
                </IonToolbar>
              </IonHeader>
              <IonContent>
                <IonGrid>
                  {props.memories.length === 0 && (
                    <IonRow className="ion-text-center">
                      <IonCol>
                        <h2>No good memories found</h2>
                      </IonCol>
                    </IonRow>
                  )}
                  {!!props.memories.length &&
                    <MemoriesList memories={props.memories} />
                   }
                </IonGrid>
                {!isPlatform("ios") && <FixedBottomFab link="/new-memory"  icon={add} />}
              </IonContent>
            </IonPage>
          )
    )
}

export default MemoriesContent;