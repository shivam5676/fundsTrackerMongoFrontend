import { TfiMenuAlt } from "react-icons/tfi"
import navcss from "./navigation.module.css"
const Navigation=()=>{
    return(
       <div className={navcss.navigation}>
          <div className={navcss.sidebtn}>
            <TfiMenuAlt className={navcss.menuicon}></TfiMenuAlt>
          </div>
          <div className={navcss.titleContainer}>
            <p className={navcss.title}>FUNDS TRACKER</p>
            <p className={navcss.heading}>modern expense viewer app</p>
          </div>
        </div> 
    )
}
export default Navigation