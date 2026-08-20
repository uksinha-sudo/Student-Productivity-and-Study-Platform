import type { RefObject } from "react";

interface inputInterface {
    lable: string;
    styles: string;
    type: string;
    placeholder?: string;
    reference: RefObject<HTMLInputElement | null>;
}

export const Input = (props: inputInterface) => {

    return(
        <>
            <div className="flex flex-col p-2">
                <p>{props.lable}</p>
                <input ref={props.reference} type={props.type} placeholder={props.placeholder} className={`mt-2 ${props.styles}`}/>
            </div>
        </>
    )

}