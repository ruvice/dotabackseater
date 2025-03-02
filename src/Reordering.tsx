import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react"

export default function Reordering() {
    const [order, setOrder] = useState(initialOrder)

    useEffect(() => {
        const timeout = setTimeout(() => setOrder(shuffle(order)), 1000)
        return () => clearTimeout(timeout)
    }, [order])

    return (
        <div style={container}>
            <AnimatePresence mode="wait">
                {order.map((backgroundColor) => (
                    <motion.li
                        key={backgroundColor}
                        layout
                        transition={{ duration: 0.6, type: "spring", damping: 20, stiffness: 300 }}
                        style={{ ...item }}
                    >{backgroundColor}</motion.li>
                ))}
            </AnimatePresence>
        </div>
    )
}

const initialOrder = [
    "#ff0088",
    "#dd00ee",
    "#9911ff",
    "#0d63f8",
]

/**
 * ==============   Utils   ================
 */
function shuffle([...array]: string[]) {
    return array.sort(() => Math.random() - 0.5)
}

/**
 * ==============   Styles   ================
 */

const spring = {
    type: "spring",
    damping: 20,
    stiffness: 300,
}

const container: React.CSSProperties = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    position: "relative",
    display: "grid",
    flexWrap: "wrap",
    gap: 10,
    height:48,
    width: 300,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
}

const item: React.CSSProperties = {
    width: 16,
    height: 16,
    borderRadius: "10px",
}