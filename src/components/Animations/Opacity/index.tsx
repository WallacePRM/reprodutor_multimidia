import React from "react";
import { motion } from "framer-motion";

function Opacity(props: MarginAnimationProps) {

    const pageVariants = {
        initial: {
            opacity: 0,
        },
        in: {
            opacity: 1,
        },
        out: {
            opacity: 0,
        }
    };

    const pageTransition = {
        type: "tween",
        cubic: "easeIn",
        duration: .2
    };

    const pageStyle: any = {
        opacity: 0,
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
        >
            {props.children}
        </motion.div>
    );
}

type MarginAnimationProps = {
    className?: string;
    style?: {},
    children: React.ReactNode;
};

export default Opacity;