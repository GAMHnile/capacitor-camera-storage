import React, {useState, useRef} from 'react';
import {IonButton, IonIcon, IonLabel} from '@ionic/react';
import { camera } from 'ionicons/icons';
import { Plugins, CameraResultType, CameraSource, Capacitor } from '@capacitor/core';
import './ImagePicker.css';

const {Camera} = Plugins;

export interface Photo {path: string | undefined; preview: string}

const ImagePicker: React.FC<{
    onImagePick: (image:Photo ) => void;
}> = props => {
    const [takenPhoto, setTakenPhoto] = useState<Photo>();
    const hiddenInputRef = useRef<HTMLInputElement>(null);
    const openFilePicker = () => {
        hiddenInputRef.current!.click();
      }
    
      const pickFileHandler = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const file = event.target!.files![0];
        const fr = new FileReader();
        fr.onload = () =>{
            const photo: Photo = {
                path: undefined,
                preview: fr.result!.toString()
              };
            setTakenPhoto(photo);
            props.onImagePick(photo);
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
          const pickedPhoto: Photo = {
            path: photo.path,
            preview: photo.webPath
          };
          setTakenPhoto(pickedPhoto);
          props.onImagePick(pickedPhoto);
        } catch (error) {
          //openFilePicker();
        }
      }
    return (
        <React.Fragment>
            <div className='img-preview'>
                        {!takenPhoto && <h2>No image selected</h2>}
                        {takenPhoto && <img src={takenPhoto.preview} alt='Preview'/>}
                    </div>
                    <IonButton fill='clear'onClick={takePhotoHandler} >
                        <IonIcon slot='start' icon={camera} />
                        <IonLabel>Take Photo</IonLabel>
                    </IonButton>
                    <input ref={hiddenInputRef} type='file' hidden onChange={pickFileHandler} />
        </React.Fragment>
    )
}

export default ImagePicker;