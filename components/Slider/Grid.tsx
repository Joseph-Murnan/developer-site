import React from 'react';
import styles from './Slider.module.css';

const Grid = React.memo(() => {
    return (
        <>
            <div className={styles.gridBlock}>    
                <div className={styles.svgContainer}>
                    <img src="/svg/js.svg" alt="javascript icon" />
                    <span>Javascript</span>
                </div>
            </div>
            <div className={styles.gridBlock}>    
                <div className={styles.svgContainer}>
                    <img className={styles.noWhitespace} src="/svg/js.svg" alt="react icon" />
                    <span>React</span>
                </div>
            </div>
            <div className={styles.gridBlock}>    
                <div className={styles.svgContainer}>
                    <img src="/svg/js.svg" alt="node.js icon" />
                    <span>Node.js</span>
                </div>
            </div>
            <div className={styles.gridBlock}>    
                <div className={styles.svgContainer}>
                    <img className={styles.noWhitespace} src="/svg/php.svg" alt="laravel icon" />
                    <span>Laravel</span>
                </div>
            </div>
            <div className={styles.gridBlock}>    
                <div className={styles.svgContainer}>
                    <img src="/svg/js.svg" alt="vue icon" />
                    <span>Vue.js</span>
                </div>
            </div>
            <div className={styles.gridBlock}>    
                <div className={styles.svgContainer}>
                    <img src="/svg/tag.svg" alt="empty tag icon" />
                    <span>HTML + CSS</span>
                </div>
            </div>
            <div className={styles.gridBlock}>    
                <div className={styles.svgContainer}>
                    <img src="/svg/storage.svg" alt="server icon" />
                    <span>Apache</span>
                </div>
            </div>
            <div className={styles.gridBlock}>    
                <div className={styles.svgContainer}>
                    <img src="/svg/leftJoin.svg" alt="database language icon" />
                    <span>SQL + MongoDB</span>
                </div>
            </div>
            
        </>
    )
})

export default Grid;