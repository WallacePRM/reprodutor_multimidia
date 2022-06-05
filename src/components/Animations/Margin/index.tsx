import React from "react";
import { motion } from "framer-motion";

function Margin(props: MarginAnimationProps) {

    const pageVariants = {
        initial: {
            opacity: 0,
            marginTop: "1.5rem",
        },
        in: {
            opacity: 1,
            marginTop: 0,
        },
        out: {
            opacity: 0,
            marginTop: "1.5rem",
        }
    };

    const pageTransition = {
        type: "tween",
        cubic: "easeIn",
        duration: .3
    };

    const pageStyle: any = {
        marginTop: "0",
        ...props.style || {}
    };


    return (
        <motion.div
            style={pageStyle}
            className={props.className ? props.className : ''}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            onScroll={props.onScroll || (() => {})}
        >
            {props.children}
        </motion.div>
    );
}

type MarginAnimationProps = {
    className?: string;
    style?: {},
    onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
    children: React.ReactNode;
};

export default Margin;