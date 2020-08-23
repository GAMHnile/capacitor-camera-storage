import React from 'react';
import { IonFab, IonFabButton, IonIcon} from '@ionic/react';

const Fab: React.FC<{link: string; icon: string}> = props =>{
    return(
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton routerLink={props.link}>
              <IonIcon icon={props.icon} />
            </IonFabButton>
          </IonFab>

    )
}

export default Fab;