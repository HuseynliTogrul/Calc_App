import { useContext } from "react"
import { CalcContext } from "../Context/CalcContext"

const Screen = () => {
  const [calc] = useContext(CalcContext)

  return (
    <div className="screen">
      {calc.num ? calc.num : calc.res}
    </div>
  )
}

export default Screen