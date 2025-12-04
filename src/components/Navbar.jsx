import dayjs from "dayjs";



import useWindowstore from "#store/window.js";
import {navLinks,navIcons} from "#constants";
const Navbar = () => {
    const {openWindow} = useWindowstore();
    return (
        <nav>
            <div>
                <img src="/images/logo.svg" alt="Logo" />
                <p className="font-bold">Jaiker Siddharth's Portfolio</p>
                <ul>
                    {navLinks.map(({id,name,type}) => (
                        <li key={id} onClick={()=>openWindow(type)}>
                            <p>{name}</p></li> 
                    ))}
                </ul>
            </div>
            <div>
                <ul>
                    {navIcons.map(({id,img})=>(
                        <li key={id}>
                            <img src={img} className="icon-hover"alt={`icon-{$id}`} />
                        </li>
                    )
                    
                )}
                
                </ul>
                <time>{dayjs().format("dd MMMM D h:mm A")}</time>
            </div>
        </nav>
    );
}
export default Navbar;