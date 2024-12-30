import React from 'react';

const BackgroundImage = () => (
    <div className="hidden sm:flex sm:w-1/2 lg:w-2/3 bg-indigo-100 text-center">
        <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
                backgroundImage:
                    "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
        ></div>
    </div>
);

export default BackgroundImage;
