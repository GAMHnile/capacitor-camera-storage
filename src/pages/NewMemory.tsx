import React from "react";
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
  IonIcon,
} from "@ionic/react";

import { camera } from 'ionicons/icons';
import './NewMemory.css';

const NewMemory: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot='start'>
              <IonButton>
                  <IonBackButton defaultHref='/good-memories'/>
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
                        <IonLabel position='floating'>Memory title</IonLabel>
                        <IonInput type='text'></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow className='ion-text-center'>
                <IonCol>
                    <div className='img-preview'>
                        <h2>No image selected</h2>
                    </div>
                    <IonButton fill='clear'>
                        <IonIcon slot='start' icon={camera} />
                        <IonLabel>Take Photo</IonLabel>
                    </IonButton>
                </IonCol>
            </IonRow>
            <IonRow className='ion-margin-top'>
                <IonCol className='ion-text-center'>
                    <IonButton>
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
