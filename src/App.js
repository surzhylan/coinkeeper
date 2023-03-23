import {useEffect, useState} from "react";

function App() {
    const savedUser = localStorage.getItem('user')
    const [user, setUser] = useState(null)
    useEffect(() => {
        setUser(savedUser ? JSON.parse(savedUser) : null)
    }, [])
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user])

    return (
        <div className="App">
            <header className="App-header">

            </header>
        </div>
    );
}

export default App;
