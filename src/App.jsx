import {Navbar,Welcome,Dock} from "#components";
import { TerminalWithWrapper } from "#windows";
import { Draggable } from "gsap/Draggable";
import gsap from "gsap";

gsap.registerPlugin(Draggable);
const App = () => {
    return (
        <main>
            <Navbar />   
            <Welcome />   
            <Dock />
            <TerminalWithWrapper />
        </main> 
    );
}
export default App;