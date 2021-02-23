import {apiPost, endpoints} from '@/api';
import ColorPicker from '@/components/ColorPicker';
import {useRequest, useSize} from 'ahooks';
import {Button, Card, Col, Divider, Row, Slider} from 'antd';
import {notification} from 'antd/es';
import canvasToImage from 'canvas-to-image';
import React, {useEffect, useRef, useState} from 'react';
import {Canvas, Circle} from 'react-g-canvas';

const download_img = a =>
{
    canvasToImage(a, {
        name: 'myPNG',
        type: 'png',
        quality: 1
    });
};

export default props =>
{
    const ref = useRef();
    const resize = useSize(ref);

    const [valueX, setValueX] = useState(50);
    const [valueY, setValueY] = useState(50);
    const [showColorPicker, setShowColorPicker] = useState(true);

    const [fgColor, setFgColor] = useState('black');
    const [bgColor, setBgColor] = useState();
    const [w, setW] = useState(resize.width);
    const [h, setH] = useState();

    const {data: apiResult, loading: apiLoading, error: apiError, run: apiRun} = useRequest(payload =>
            apiPost(`${endpoints.upload}`, {data: payload}),
        {
            manual: true
        });

    const [mode, setMode] = useState('background');

    const [saveLocal, setSaveLocal] = useState(false);
    const [saveToDb, setSaveDb] = useState(false);

    const [dots, setDots] = useState([
        {
            x: 0,
            y: 0
        }
    ]);


    useEffect(() =>
    {
        if (Boolean(ref?.current) && Boolean(saveLocal))
        {
            setSaveLocal(false);
            const canvas = ref?.current.children[0].children[0];

            download_img(canvas);
        }
    }, [ref?.current, saveLocal]);

    console.log(apiResult);

    useEffect(() =>
    {
        const fetchData = async a =>
        {
            await apiRun({'base64Str': a});
        };
        if (Boolean(saveToDb) && Boolean(ref?.current))
        {
            setSaveDb(false);
            const canvas = ref?.current.children[0].children[0].toDataURL('image/png').split(';base64')[1];

            fetchData(canvas);
        }
        if (Boolean(apiResult))
        {
            notification.info('Saved');
        }

    }, [saveToDb, ref?.current, apiResult]);


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


    return <Card className={'doodle-app'}>
        <Row gutter={[8, 8]}>
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
                         id={'canv'}
                         className={'debug'}>
                        try to resize : {resize.width} : {resize.height}
                        <Canvas width={resize.width}
                                id={'canv'}
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
        <Row align={'middle'}>
            <Col>
                <Button type={'primary'}
                    // className={'color-picker-fg'}
                        onClick={() =>
                        {
                            setMode('foreground');
                            // setShowColorPicker(!Boolean(showColorPicker));
                        }}>Pen </Button>
            </Col>
            <Col>
                <Button type={'primary'}
                    // className={'color-picker-bg'}
                        onClick={() =>
                        {
                            setMode('background');
                            // setShowColorPicker(!Boolean(showColorPicker));
                        }}
                >Background
                </Button>
            </Col>
            <Col>
                <Button type={'primary'}
                        onClick={() => setSaveLocal(true)}
                > Save Local</Button>
            </Col>

            <Col>
                <Button type={'primary'}
                        htmlType={'submit'}
                        onClick={e =>
                        {
                            setSaveDb(true);
                            console.log(e);
                        }}>Save
                    to DB</Button>


            </Col>
        </Row>

    </Card>;

};
