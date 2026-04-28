
import { RiEdit2Line } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";

type Props={

    onEditing: () => void;
    onDelete: () => void;
}

export function BotoesDelEdit({onEditing, onDelete}: Props) {

    return(
    <div className='acoes'>
        <button className="buttonAcoes editar" onClick={ onEditing}><RiEdit2Line  /></button>
        <button className="buttonAcoes lixeira" onClick={ onDelete}><MdOutlineDeleteOutline  /></button>
    </div>
    )
}