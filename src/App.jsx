import {Navbar,Welcome,Dock} from "#components";
import { TerminalWithWrapper,ResumeWithWrapper,FinderWithWrapper, TextWithWrapper, ImageWithWrapper ,ContactWithWrapper} from "#windows";
import { Draggable } from "gsap/Draggable";
import gsap from "gsap";
import { SafariWithWrapper } from "#windows";
import { Home } from "#components";


gsap.registerPlugin(Draggable);
const App = () => {
    return (
        <main>
            <Navbar />   
            <Welcome />   
            <Dock />
            <TerminalWithWrapper />
            <SafariWithWrapper />
            <ResumeWithWrapper />
            <FinderWithWrapper />
            <TextWithWrapper />
            <ImageWithWrapper />
            <ContactWithWrapper />
            <Home/>
        </main> 
    );
}
export default App;