import React from 'react'
import List from '../Components/List/List'
import AddPanel from '../Components/AddPanel/AddPanel'
import Header from '../Components/Header/Header'
import Total from '../Components/Total/Total'
import './App.css'

export class App extends React.Component {
    render() {
        return <section className="app">
            <article>
                <Header />
            </article>
            <article className="expand" >
                <List />
            </article>
            <article>
                <AddPanel />
            </article>
            <article>
                <Total />
            </article>
        </section>
    }
}

export default App;
