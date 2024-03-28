import React from "react";

const Home = () => {
    const img_link = 'https://ih1.redbubble.net/image.4309935717.4355/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg';
    return (
        <>
        <h4>This is the homepage!</h4>
        <img style={{width: '100'}} alt="gato joinha" src={img_link} />
        </>
    )
};

export { Home };