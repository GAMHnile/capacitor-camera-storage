import React, { useState, useRef, useContext } from "react";
import {useHistory} from 'react-router-dom';
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
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { camera } from 'ionicons/icons';
import { Plugins, CameraResultType, CameraSource, FilesystemDirectory, Capacitor } from '@capacitor/core';
import { base64FromPath } from '@capacitor-community/react-hooks/filesystem';
import './NewMemory.css';

import MemoriesContext from '../data/memories-context';

const {Camera, Filesystem} = Plugins;


const NewMemory: React.FC = () => {
  const titleRef = useRef<HTMLIonInputElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const memoriesCtx = useContext(MemoriesContext);
  const [takenPhoto, setTakenPhoto] = useState<{path: string | undefined; preview: string}>();
  const [selectedMemoryType, setSelectedMemoryType ] = useState<'good' | 'bad'>('good');

  const openFilePicker = () => {
    hiddenInputRef.current!.click();
  }

  const pickFileHandler = (event: React.ChangeEvent<HTMLInputElement>)=>{
    const file = event.target!.files![0];
    const fr = new FileReader();
    fr.onload = () =>{
      setTakenPhoto({
        path: undefined,
        preview: fr.result!.toString()
      })
    }
    fr.readAsDataURL(file);
  }

  const takePhotoHandler= async () =>{
    if (!Capacitor.isPluginAvailable('Camera')){
      openFilePicker();
      return
    }
    try{
      const photo = await Camera.getPhoto({
        width: 500,
        source: CameraSource.Photos,
        resultType: CameraResultType.Uri,
        quality: 80,
      })
      if(!photo || !photo.webPath ) {
        return;
      };
      setTakenPhoto({
        path: photo.path,
        preview: photo.webPath
      })
    } catch (error) {
      //openFilePicker();
    }
  }

  const saveMemoryHandler = async ()=>{
    const enteredTitle = titleRef.current!.value;

    if(!enteredTitle || enteredTitle.toString().trim().length === 0 || !takenPhoto || !selectedMemoryType ){
      return;
    }

    const filePath = new Date().getTime() + '.jpeg';
    const base64 = await base64FromPath(takenPhoto!.preview);
    await Filesystem.writeFile({
      path: filePath,
      data: base64,
      directory: FilesystemDirectory.Data
    })
    memoriesCtx.addMemory(enteredTitle.toString(), base64, filePath, selectedMemoryType);
    setTakenPhoto({path: undefined, preview: ''})
    titleRef.current!.value = '';
    if(history.length > 0){
      history.goBack();
    }else{
      history.replace('/good-memories');
    }
  };

  const selectMemoryHandler = (event: CustomEvent) =>{
    setSelectedMemoryType(event.detail.value);
  }
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
                        <IonInput ref={titleRef} type='text'></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonSelect value={selectedMemoryType} onIonChange={selectMemoryHandler} >
                  <IonSelectOption value='good'>Good Memory</IonSelectOption>
                  <IonSelectOption value='bad'>Bad Memory</IonSelectOption>
                </IonSelect>
              </IonCol>
            </IonRow>
            <IonRow className='ion-text-center'>
                <IonCol>
                    <div className='img-preview'>
                        {!takenPhoto && <h2>No image selected</h2>}
                        {takenPhoto && <img src={takenPhoto.preview} alt='Preview'/>}
                    </div>
                    <IonButton fill='clear'onClick={takePhotoHandler} >
                        <IonIcon slot='start' icon={camera} />
                        <IonLabel>Take Photo</IonLabel>
                    </IonButton>
                    <input ref={hiddenInputRef} type='file' hidden onChange={pickFileHandler} />
                </IonCol>
            </IonRow>
            <IonRow className='ion-margin-top'>
                <IonCol className='ion-text-center'>
                    <IonButton onClick={saveMemoryHandler} >
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
