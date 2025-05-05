interface Props{
    title?:string;
    text?:string;
}
export default function DivBlackTranparent({title, text}:Props){
    return(
        <div className="w-full text-white h-full bg-gradient-to-t justify-end space-y-2 flex flex-col p-5 absolute top-0 left-0 from-black/70 to-black/20">
            <span className="font-semibold z-20">{title}</span>
            <span className="text-xs z-20">{text}</span>

        </div>
    )
}