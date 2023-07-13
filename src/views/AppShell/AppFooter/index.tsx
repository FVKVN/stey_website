import React from 'react';

import './app-footer.scss';

const baseClass = 'app-footer';
export default function AppFooter() {
    return (
        <footer className={baseClass}>
            <div className={`${baseClass}__inner`}>
                <p className={`${baseClass}__item`}>
                    © Firmin Steyaert - {new Date().getFullYear()}
                </p>
                <p className={`${baseClass}__item`}>
                    Created by <a href="mailto:hey@fvkvn.be">FVKVN</a>
                </p>
            </div>
        </footer>
    );
}
