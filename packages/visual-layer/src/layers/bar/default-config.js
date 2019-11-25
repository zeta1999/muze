import { CLASSPREFIX } from '../../enums/constants';
import { transformColor } from 'muze-utils';

export const defaultConfig = {
    classPrefix: CLASSPREFIX,
    defClassName: 'layer-bar',
    className: '',
    interaction: {
        highlight: {
            style: {
                stroke: 'black',
                'stroke-width': '1px'
            },
            strokePosition: 'center'
        },
        focusStroke: {
            className: 'focus-stroke-class',
            style: {
                stroke: 'black',
                'stroke-width': '2px'
            },
            strokePosition: 'outside'
        },
        brushStroke: {
            className: 'brush-stroke-class',
            style: {
                stroke: 'black',
                'stroke-width': '1px'
            },
            strokePosition: 'outside'
        },
        fade: {
            style: {
                fill: (rgbaValues, data, apply) => transformColor(rgbaValues, {
                    l: +15
                }, data, apply).color
            }
        },
        focus: {
            style: {
                fill: (rgbaValues, data, apply) => transformColor(rgbaValues, {
                    a: -0.5
                }, data, apply).color
            }
        }
    },
    transform: {
        type: 'stack'
    },
    transition: {
        effect: 'cubic',
        duration: 1000
    },
    innerPadding: 0.1,
    encoding: {
        color: {},
        x: {},
        y: {},
        x0: {},
        y0: {},
        stroke: {
            value: '#000'
        },
        strokeWidth: {
            value: '0px'
        }
    },
    states: {
        highlight: {
            className: `${CLASSPREFIX}-layer-bar-highlight`
        },
        fadeout: {
            className: `${CLASSPREFIX}-layer-bar-fadeout`
        },
        selected: {
            className: `${CLASSPREFIX}-layer-bar-selected`
        }
    }
};
