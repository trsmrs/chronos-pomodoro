import { ToastContainer, Bounce } from "react-toastify"

type ToastContainerProps = {
    children: React.ReactNode
}

export function MessageContainer({ children }: ToastContainerProps) {

    return (
        <>
            {children}
            <ToastContainer
                position="top-right"
                autoClose={10000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            >
            </ToastContainer>
        </>
    )
}