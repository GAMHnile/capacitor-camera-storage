import React from "react";

import {
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import { Memory } from "../data/memories-context";
import './MemoryItem.css';

const MemoryItem: React.FC<{ memory: Memory }> = (props) => {
  return (
    <IonRow>
      <IonCol>
        <IonCard className="memory-card">
          <img src={props.memory.base64Url} alt={props.memory.title} />
          <IonCardHeader>
            <IonCardTitle>{props.memory.title}</IonCardTitle>
          </IonCardHeader>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};

export default MemoryItem;
