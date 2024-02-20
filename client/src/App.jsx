import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { Navigation } from './components/Navigation/Navigation';
import { Header } from './components/Header/Header';
import { ShowCase } from "./components/ShowCase/ShowCase";
import './App.css';

export const App = (props) => {

    return (
        <>
            <Navigation />
            <Header />
            <ShowCase />
        </>
    )
}