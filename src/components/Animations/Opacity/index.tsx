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
        cubic: "easeInOut",
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
            onClick={ props.onClick ? props.onClick : () => {} }
        >
            {props.children}
        </motion.div>
    );
}

type MarginAnimationProps = {
    className?: string;
    style?: {},
    children: React.ReactNode;
    onClick?: React.ReactEventHandler;
};

export default Opacity;