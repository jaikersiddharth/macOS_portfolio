import { locations } from "#constants";
import useWindowstore from "#store/window.js";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { Draggable } from "gsap/Draggable";
import useLocationStore from "#store/location.js";

const projects =locations.work?.children ?? [];

const Home = ()=>{
    const {setActiveLocation} = useLocationStore();
    const {openWindow} = useWindowstore();
    const handleOpenWindow = (type)=>{
        setActiveLocation(type);
        openWindow("finder");
    }
    useGSAP(()=>{
        Draggable.create(".folder")
    },[])
    return(
        <section id="home">
            <ul>
                {projects.map((project)=>(
                    <li key={project.id} className={clsx("group folder",project.windowPosition)}
                    onClick={()=>handleOpenWindow(project)}>
                        <img src="/images/folder.png" alt={project.name} />
                        <p>{project.name}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}
export default Home;