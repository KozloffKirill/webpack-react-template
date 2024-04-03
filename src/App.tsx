import React, { FC, useState } from "react";
import sts from './styles.module.css';

const App: FC = () => {
    const [counter, setCounter] = useState<number>(0);

    return (
        <section className={sts.app}>
            <button onClick={() => setCounter(prev => prev + 1)}>Counter: {counter}</button>
        </section>
    );
};

export default App;