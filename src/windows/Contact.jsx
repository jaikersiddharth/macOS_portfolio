import { socials } from "#constants";
import { WindowWrapper } from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components";
const Contact = ()=>{
    return (
        <>
        
        <div id="window-header">
            <WindowControls target="contact"/>
            <h2>Contact Me</h2>
        </div>
        <div className="p-5 space-y-5">
            <img src="/images/jsiddharth.jpg" alt="Jaiker Siddharth" className="w-32 rounded-full "/>
            <h3>Let's Connect</h3>
            <p>Got an idea or just want to say hi? Feel free to reach out!</p>
            <p>jaikersiddharth@gmail.com</p>
            <ul>
                {socials.map(({id,bg,link,icon,text})=>(
                    <li key={id} style={{backgroundColor: bg} }>
                        <a href={link} target="__blank" rel="noopener noreferrer" title={text}>
                            <img src={icon} alt={text} className="size-5"/>
                        </a>
                        <p>{text}</p>
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
}
const ContactWithWrapper = WindowWrapper(Contact,'contact');
export default ContactWithWrapper;