import React from "react";
import { motion } from "framer-motion";
import { AnimationsProps } from "../type";

function Opacity(props: AnimationsProps) {

    console.log()
    const pageVariants = {
        initial: {
            [props.cssAnimation[0]]: 0,
        },
        in: {
            [props.cssAnimation[0]]: 1,
        },
        out: {
            [props.cssAnimation[0]]: 0,
        }
    };

    const pageTransition = {
        type: "tween",
        cubic: "easeInOut",
        duration: .2
    };

    const pageStyle: any = {
        [props.cssAnimation[0]]: 0,
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

export default Opacity;