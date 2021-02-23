import {defineConfig} from 'umi';

export default defineConfig({
    hash: false,
    ignoreMomentLocale: true,

    title: 'doodle',
    publicPath: '/static/',

    nodeModulesTransform: {
        type: 'none'
    },

    dynamicImport: {
        loading: '@/components/Loading/index.js'
    },

    headScripts: [
        {
            content: 'console.log("loaded")'
        }
    ],
    styles: [
        'https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;500&display=swap',
        'body {font-weight: 300; font-family: "Work Sans", sans-serif;} a {cursor: pointer;}'
    ],
    scripts: [
        {
            content: 'console.log("loaded in the end")'
        }
    ]
});
//
//
// import {Card, Col, Row, Slider} from 'antd';
// import React, {useEffect, useState} from 'react';
// // import {Canvas, Circle} from 'react-g-canvas';
// import Canvas from 'react-responsive-canvas';
//
//
//
// export default props =>
// {
//     const [backgroundColor, setBackgroundColor] = useState('red');
//
//     const [valueX, setValueX] = useState(500);
//     const [valueY, setValueY] = useState(500);
//     const [width, setWidth] = useState(0);
//     const [height, setHeight] = useState(0);
//     const [dots, setDots] = useState([
//         {
//             x: valueX,
//             y: valueY
//         }
//     ]);
//
//     const pixelRatio = window.devicePixelRatio;
//
//     console.log(dots);
//
//     useEffect(() =>
//     {
//         setDots([
//             ...dots,
//             {
//                 x: valueX,
//                 y: valueY
//             }
//         ]);
//
//     }, [valueX, valueY]);
//
//     console.log(pixelRatio);
//     const displayWidth = Math.floor(pixelRatio * width);
//     const displayHeight = Math.floor(pixelRatio * height);
//
//     return <Card className={'doodle-app'}>
//         <Row gutter={[16, 16]}>
//             <Col span={4}>
//                 <Slider vertical={true}
//                         min={0}
//                         max={1000}
//                         value={valueY}
//                         onChange={setValueY}/>
//             </Col>
//
//             <Col span={20}>
//                 <Card className={'canvas-holder'}>
//                     <Canvas name={'canvas'}>
//                         {dots.map(dot => <Circle x={dot.x}
//                                                  y={dot.y}
//                                                  r={10}
//                                                  fill={`${backgroundColor}`}/>
//                         )}
//                     </Canvas>
//                 </Card>
//             </Col>
//         </Row>
//
//         <Row>
//             <Col span={4}>
//                 <div className={'color-pickers'}>
//                     <div className={'color-picker-fg'}>Pen</div>
//                     <div className={'color-picker-bg'}>Background</div>
//                 </div>
//             </Col>
//
//             <Col span={20}>
//                 <Slider min={0}
//                         max={1000}
//                         value={valueX}
//                         onChange={e => setValueX(e)}/>
//             </Col>
//         </Row>
//     </Card>;
// };
