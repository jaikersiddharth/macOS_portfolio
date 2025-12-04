import { WindowWrapper } from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components";
import useWindowstore from "#store/window.js";

const Image = () => {
    const { windows } = useWindowstore();
    const data = windows?.imgfile?.data;
    if (!data) return null;

    const { name, imageUrl } = data;

    return (
        <>
            <div id="window-header">
                <WindowControls target="imgfile" />
                <h2>{name}</h2>
            </div>
            <div className="p-4 overflow-auto h-full bg-white flex flex-col items-center justify-center">
                {imageUrl && (
                    <img src={imageUrl} alt={name} className="max-w-full max-h-full object-contain" />
                )}
            </div>
        </>
    );
};

const ImageWithWrapper = WindowWrapper(Image, 'imgfile');
export default ImageWithWrapper;
