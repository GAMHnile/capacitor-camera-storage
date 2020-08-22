import React from 'react';
import { IonFab, IonFabButton, IonIcon} from '@ionic/react';
import {add} from 'ionicons/icons';

const Fab: React.FC<{link: string}> = props =>{
    return(
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton routerLink={props.link}>
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>

    )
}

export default Fab;