import sidecss from "./sidePanel.module.css";
const SidePanel = () => {
  return (
    
      <div className={sidecss.sideContainer}>
        <div className={sidecss.sideColumn}>hello</div>
        <div className={sidecss.sideColumn}>testing start</div>
        <div className={sidecss.sideColumn}>my helper function</div>
      </div>

  );
};
export default SidePanel;
