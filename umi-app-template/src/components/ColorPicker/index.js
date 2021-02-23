import {CloseOutlined} from '@ant-design/icons';
import {Col, Row} from 'antd';
import React, {useEffect, useState} from 'react';
import {SketchPicker, SwatchesPicker} from 'react-color';

const ColorPicker = (props) =>
{
    const {onChange, type = 'sketch', onClick} = props;

    const [color, setColor] = useState('#fff');

    useEffect(() =>
    {
        onChange(color);

    }, [color]);


    return <>
        <Row>
            <Col>
                {type === 'sketch' && <SketchPicker
                    onChange={setColor}
                    color={color}/>
                }

                {type === 'swatches' && <SwatchesPicker/>}


                {type === 'test' && <SwatchesPicker
                    onChange={setColor}
                    color={color}
                    header={props.header}
                    onChangeComplete={onChangeComplete}
                />}
            </Col>
            <Col>


            </Col>
        </Row>
    </>;
};

export default ColorPicker;
