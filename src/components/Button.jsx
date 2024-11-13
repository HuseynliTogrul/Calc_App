import { useContext } from "react"
import { CalcContext } from "../Context/CalcContext"

const getStyleName = btn => {
    const className = {
        "=": 'equals',
        "x": 'opt',
        "+": 'opt',
        "-": 'opt',
        "/": 'opt',
        "C": 'optTop',
        "+-": 'optTop',
        "%": 'optTop',
    }
    return className[btn]
}

// eslint-disable-next-line react/prop-types
const Button = ({ value }) => {
    const [calc, setCalc] = useContext(CalcContext)

    // .
    const commaClick = () => {
        setCalc({
            ...calc,
            num: !calc.num.toString().includes('.') ? calc.num + value : calc.num
        })
    }

    // C
    const resetClick = () => {
        setCalc({ sign: "", num: 0, res: 0 })
    }

    // +-*/
    const signClick = () => {
        setCalc({
            sign: value,
            res: !calc.res && calc.num ? calc.num : calc.res,
            num: 0
        })
    }

    // =
    const equalClick = () => {

        if (calc.res && calc.num) {
            const math = (a, b, sign) => {
                const result = {
                    '+': (a, b) => a + b,
                    '-': (a, b) => a - b,
                    'x': (a, b) => a * b,
                    '/': (a, b) => a / b,
                }
                return result[sign](a, b)
            }
            setCalc({
                sign: '',
                res: math(calc.res, calc.num, calc.sign),
                num: 0
            })
        }
    }

    // %
    const parsenClick = () => {
        setCalc({
            res: calc.res / 100,
            num: calc.num / 100,
            sign: ''
        })
    }

    // +-
    const inverClick = () => {
        setCalc({
            res: calc.res ? calc.res * -1 : calc.res,
            num: calc.num ? calc.num * -1 : calc.num,
            sign: ''
        })
    }

    const handleClickButton = () => {
        const numberString = value.toString()
        let numberValue;

        if (calc.num.toString().length < 16) {
            if (numberString === '0' && calc.num === 0) {
                numberValue = '0'
            } else {
                numberValue = Number(calc.num + numberString)
            }

            setCalc({
                ...calc,
                num: numberValue
            })
        }
    }

    const handleBtnClick = () => {
        const results = {
            '.': commaClick,
            'C': resetClick,
            'x': signClick,
            '/': signClick,
            '+': signClick,
            '-': signClick,
            '=': equalClick,
            '%': parsenClick,
            '+-': inverClick
        }
        if (results[value]) {
            return results[value]()
        } else {
            return handleClickButton()
        }
    }
    return (
        <button onClick={handleBtnClick} className={`${getStyleName(value)} button`}>{value}</button>
    )
}

export default Button