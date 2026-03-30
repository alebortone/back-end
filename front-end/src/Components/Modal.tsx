import "../Styles/Modal.css"

type ModalProps = {
    children: React.ReactNode;
};

function Modal({ children }: ModalProps) {
    return (
        <div className="overlay">
            <div className="modal">
                {children}
            </div>
        </div>
    );
}

export default Modal;