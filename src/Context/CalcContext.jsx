import { useState, createContext } from "react"

export const CalcContext = createContext()

export const CalcProvider = ({ children }) => {
    const [calc, setCalc] = useState({
        sign: "",
        num: 0,
        res: 0
    })

    return (
        <div>
            <CalcContext.Provider value={[calc, setCalc]} >
                {children}
            </CalcContext.Provider>
        </div>
    )
}

export default CalcProvider