import React from 'react';
import { useNavigate } from 'react-router-dom';
import './not-found.scss';
import Button from '../../common/components/Button';

function NotFound() {
    return (
        <div className="NotFound">
            <Content />
        </div>
    );
}

function Content() {
    const navigate = useNavigate();
    return (
        <div>
            <h1 className="NotFound__title">Helaas, deze pagina kunnen we niet vinden.</h1>
            <p>
                <Button id="not-found-back-link" typeName="primary" onClick={navigateToHome}>
                    Naar startpagina
                </Button>
            </p>
        </div>
    );

    function navigateToHome() {
        navigate('/');
    }
}

export default NotFound;
