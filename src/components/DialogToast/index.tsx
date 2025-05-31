import { ToastContentProps } from "react-toastify";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { DefaultButton } from "../DefaultButton";

import styles from './style.module.css'

export function Dialog({closeToast, data}: ToastContentProps<string>){
    return(
        <>
            <div className={styles.container}>
                <p>{data}</p>

                <div className={styles.buttonsContainer}>
                    <DefaultButton 
                     onClick={()=> closeToast(true)}
                     icon= {<ThumbsUpIcon />}
                     aria-label="Confirmar ação e fechar"
                     title="Confirmar ação e fechar"
                    />

                    <DefaultButton 
                     onClick={()=> closeToast(false)}
                     icon={<ThumbsDownIcon />}
                     color="red"
                    />
                    
                </div>
            </div>
        </>
    )
}