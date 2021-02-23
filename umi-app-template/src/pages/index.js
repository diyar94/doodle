import ColorPicker from '@/components/ColorPicker';
import {useSize} from 'ahooks';
import {Button, Card, Col, Divider, Row, Slider} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {Canvas, Circle} from 'react-g-canvas';


export default props =>
{
    const ref = useRef();
    const resize = useSize(ref);

    const [valueX, setValueX] = useState(50);
    const [valueY, setValueY] = useState(50);
    const [showColorPicker, setShowColorPicker] = useState(false);

    const [fgColor, setFgColor] = useState('black');
    const [bgColor, setBgColor] = useState();
    const [w, setW] = useState(resize.width);
    const [h, setH] = useState();

    const [mode, setMode] = useState('background');

    const [dots, setDots] = useState([
        {
            x: 0,
            y: 0
        }
    ]);

    console.log(ref?.current);
    console.log(resize.width);
    useEffect(() =>
    {
        if (Boolean(ref?.current))
        {
            setW(1000);


        }

    }, [ref?.current]);

    useEffect(() =>
    {
        setDots([
            ...dots,
            {
                x: valueX,
                y: valueY
            }
        ]);

    }, [valueX, valueY]);

    console.log(w);
    return <Card className={'doodle-app'}>
        {/*<Row>*/}
        {/*    <Col>*/}
        {/*        <Button type={'primary'}*/}
        {/*            // className={'color-picker-fg'}*/}
        {/*                onClick={() =>*/}
        {/*                {*/}
        {/*                    setMode('foreground');*/}
        {/*                    setShowColorPicker(!Boolean(showColorPicker));*/}
        {/*                }}>Pen </Button>*/}
        {/*    </Col>*/}

        <Col>
            <Button type={'primary'}
                // className={'color-picker-bg'}
                    onClick={() =>
                    {
                        setMode('background');
                        setShowColorPicker(!Boolean(showColorPicker));
                    }}
            >Background
            </Button>
        </Col>

        {/*</Col>*/}
        {/*    <Col>*/}
        {/*        <Button type={'primary'}*/}
        {/*                download={'myImage.jpg'}> Save Local</Button>*/}
        {/*    </Col>*/}

        {/*    <Col>*/}
        {/*        <Button type={'primary'}>Save to DB</Button>*/}
        {/*    </Col>*/}
        {/*</Row>*/}

        <Row>
            <Col>
                <Slider vertical={true}
                        reverse={true}
                        min={0}
                        max={100}
                        value={valueY}
                        onChange={setValueY}/>
            </Col>

            <Col span={20}>
                <Slider min={0}
                        max={100}
                        defaultValue={valueX}
                        value={valueX}
                        onChange={e => setValueX(e)}/>

                <Card className={'canvas-holder'}
                      id={'card'}
                      forwardref={ref}>
                    <div ref={ref}
                         className={'debug'}>
                        try to resize : {resize.width} : {resize.height}
                        <Canvas width={resize.width}
                                height={resize.height}
                                style={{
                                    backgroundColor: `${bgColor}`
                                }}>
                            {dots.map((dot, key) => <Circle key={key}
                                                            x={dot.x}
                                                            y={dot.y}
                                                            r={7}
                                                            fill={`${fgColor}`}/>
                            )}
                        </Canvas>
                    </div>

                </Card>
            </Col>
        </Row>


        <Divider/>
        {
            Boolean(showColorPicker) && <ColorPicker mode={'foreground'}
                                                     onChange={e =>
                                                     {
                                                         Boolean(mode === 'foreground') ? setFgColor(e.hex) : setBgColor(e.hex);

                                                     }
                                                     }/>
        }

    </Card>;
};
