export const Button = ({onClick, children}:{onClick: () => void, children: React.ReactNode}) => {
    return (<>
        <button onClick={onClick} className= " w-28 h-14 bg-blue-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">
            {children}
        </button>
    </>)
}