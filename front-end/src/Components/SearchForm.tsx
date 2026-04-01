
interface Props {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    onClear: () => void;
    onOpen: (value: boolean) => void;
    textButton: string;

}

function SearchForm({ value, onChange, onSubmit, onClear, onOpen, textButton }: Props) {

    return (
        <div className="areaAdd">
            <div>
                <form action="" onSubmit={(e) => { e.preventDefault(); onSubmit() }}>
                    <input className="inputBuscar" type="search" placeholder='Buscar...' value={value} onChange={(e) => onChange(e.target.value)} />
                    <button onClick={onClear} type="button" className='buttonLimpar'>Limpar</button>
                    <button className='buttonBuscar'>Buscar</button>
                </form>
            </div>
            <button className="buttonAdd" onClick={() => onOpen(true)}> {textButton} </button>
        </div>

    )
}


export default SearchForm;