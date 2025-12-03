import useWindowstore from "#store/window.js";

const WindowControls = ({target}) => {
    const {closeWindow} = useWindowstore();
    return (
        <div id="window-controls"> 
            <div className="close" onClick={() => closeWindow(target)}/>
            <div className="minimize"/>
            <div className="maximize"/>


            
        </div>
)}
export default WindowControls;