import { useNavigate } from 'react-router-dom'
import { Button } from '../Components/Button'

export const Landing = () => {
    const navigator = useNavigate()


    return <>
        <div className="grid grid-col-1 md:grid-cols-2">
            
            <div className="flex justify-center items-center mt-32">
                <img className="max-w-96" src={"/chess_image.png"} alt="chess board" />
            </div>

            <div className='mt-32 flex flex-col justify-center items-center'>
                <h1 className="text-4xl font-bold text-slate-50">Play chess online on the site #2 site</h1>

                <div className="mt-4">
                    <Button onClick={() => navigator("/game")}>Play Online</Button>
                </div>
            </div>
        </div>
    </>
}