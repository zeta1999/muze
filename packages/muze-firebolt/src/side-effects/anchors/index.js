import { DataModel } from 'muze-utils';

import { CLASSPREFIX } from '../../enums/constants';
import SpawnableSideEffect from '../spawnable';

import './styles.scss';

export default class AnchorEffect extends SpawnableSideEffect {
    constructor (...params) {
        super(...params);
        this._layers = this.addAnchorLayers();
    }

    static target () {
        return 'visual-unit';
    }

    static defaultConfig () {
        return {
            className: `${CLASSPREFIX}-anchors-group`
        };
    }

    static formalName () {
        return 'anchors';
    }

    addAnchorLayers () {
        const layers = [];
        const context = this.firebolt.context;
        context.layers().forEach((layer) => {
            const shouldDrawAnchors = layer.shouldDrawAnchors();
            if (shouldDrawAnchors) {
                const encodingFieldsInf = layer.encodingFieldsInf();
                const layerObj = {
                    instances: context.addLayer({
                        name: `${layer.alias()}-${this.constructor.formalName()}`,
                        mark: 'point',
                        className: this.constructor.defaultConfig().className,
                        encoding: {
                            x: encodingFieldsInf.xField,
                            y: encodingFieldsInf.yField,
                            color: {
                                field: encodingFieldsInf.colorField
                            },
                            size: {
                                field: encodingFieldsInf.sizeField,
                                value: this.defaultSizeValue()
                            }
                        },
                        transform: {
                            type: 'identity'
                        },
                        transition: this.getTransitionConfig(),
                        calculateDomain: false,
                        source: dt => dt.select(() => false, {
                            saveChild: false
                        }),
                        interactive: false,
                        render: false
                    }),
                    linkedLayer: layer
                };

                layers.push(layerObj);
            }
        });
        return layers;
    }

    getTransitionConfig () {
        return {
            disabled: true
        };
    }

    /**
     * Returns the default area value of the anchor point.
     * @return { number } Default area value of anchor.
     */
    defaultSizeValue () {
        return 100;
    }

    apply (selectionSet) {
        const self = this;
        const dataModel = selectionSet.mergedEnter.model;
        if (selectionSet.isSourceFieldPresent !== false) {
            const drawingInf = this.drawingContext();
            const sideEffectGroup = drawingInf.sideEffectGroup;
            const className = `${this.config().className}`;
            const layers = this._layers;
            const parentGroup = this.createElement(sideEffectGroup, 'g', [1], `${className}-container`);
            const anchorGroups = this.createElement(parentGroup, 'g', layers);
            anchorGroups.each(function (layer) {
                const instances = layer.instances;
                const elems = self.createElement(this, 'g', instances, className);
                const linkedLayer = layer.linkedLayer;
                const [transformedData, schema] = linkedLayer.getTransformedDataFromIdentifiers(dataModel);
                const transformedDataModel = new DataModel(transformedData, schema);
                elems.each(function (d, i) {
                    instances[i].data(transformedDataModel).mount(this);
                });
            });
        }
        return this;
    }
}
