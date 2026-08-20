interface ButtonProps {
    "lable" : string;
    disable?: boolean;
    onClick?: () => void; 
    style: string;
}


export const Button = (props: ButtonProps) => {
    return(
        <>
            <span onClick={props.onClick} className={`${props.disable ? "bg-[#8fafc6] cursor-not-allowed" : "bg-[#1A3F75] text-[#ffffff] cursor-pointer"} ${ props.style}`}  >
                {props.lable}
            </span>
        </>
    )
}