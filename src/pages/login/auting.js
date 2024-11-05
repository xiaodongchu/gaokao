import React, { useEffect } from 'react';

const AuthingGuard = () => {
    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.authing.co/packages/guard/5.2.0/guard.min.css';
        document.head.appendChild(link);

        const loadAuthingGuard = async () => {
            await import('https://cdn.authing.co/packages/guard/5.2.0/guard.min.js');
            const guard = new window.GuardFactory.Guard({
                appId: '62fc94595854df71f7bbe61e'
            });
            guard.start('#authing-guard-container').then((userInfo) => {
                console.log('userInfo in start: ', userInfo);
                if(userInfo.token && userInfo.id) {
                    localStorage.setItem('token', userInfo.token);
                    localStorage.setItem('username', userInfo.id);
                    window.location.href = '/school';
                } else {
                    console.log('userInfo: ', userInfo);
                }
            });
        };

        loadAuthingGuard().then(r => console.log('loadAuthingGuard: ', r));
    }, []);

    return (
        <div>
            <div id="authing-guard-container"></div>
        </div>
    );
};

export default AuthingGuard;
