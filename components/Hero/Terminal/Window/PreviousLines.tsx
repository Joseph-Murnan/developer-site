import React, { ReactElement, Fragment } from 'react';
import styles from '../Terminal.module.css';

interface Props {
    prevLines: Array<Array<string>>
}

const PreviousLines = React.memo((props: Props): ReactElement => {
    return (
        <Fragment>
            { props.prevLines.map((p: Array<string>, index: number) => 
                <div className={`${styles.line}`} key={index}>
                    <span className={styles.prependLine}>Joseph$ { p[0] } %</span><span>{ p[1] }</span>
                </div>
            )}
        </Fragment>
    )
})

export default PreviousLines;