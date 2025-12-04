import { WindowWrapper } from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components";
import useWindowstore from "#store/window.js";

const Text = () => {
    const { windows } = useWindowstore();
    const data = windows?.txtfile?.data;
    if (!data) return null;

    const { name, image, imageUrl, subtitle, description } = data;

    return (
        <>
            <div id="window-header">
                <WindowControls target="txtfile" />
                <h2>{name}</h2>
            </div>
            <div className="p-4 overflow-auto h-full bg-white">
                { (image || imageUrl) && (
                    <div className="mb-4">
                        <img src={image ?? imageUrl} alt={name} className="w-40" />
                    </div>
                ) }
                { subtitle && <h3 className="text-sm font-medium mb-2">{subtitle}</h3> }
                { Array.isArray(description) && description.map((para, i) => (
                    <p key={i} className="mb-2 leading-relaxed">{para}</p>
                )) }
            </div>
        </>
    );
};

const TextWithWrapper = WindowWrapper(Text, 'txtfile');
export default TextWithWrapper;
