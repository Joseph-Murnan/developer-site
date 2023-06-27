import React, { ReactElement, Fragment } from 'react';
import { PrevLine } from '../../../../store/types';
import styles from '../Terminal.module.css';

interface Props {
    prevLines: Array<PrevLine>
}

const PreviousLines = React.memo((props: Props): ReactElement => {
    return (
        <Fragment>
            { Object.values(props.prevLines).map((p: PrevLine, index: number) => 
                <div className={`${styles.line}`} key={index}>
                    <span className={styles.prependLine}>Joseph$ { p.active } %</span><span>{ p.text }</span>
                </div>
            )}
        </Fragment>
    )
})

export default PreviousLines;