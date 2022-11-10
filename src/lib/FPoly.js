import { debounce } from '../utils.js';

let rootComponent = null;
let rootElement = null;
let isFirstRender = true;

const states = [];
let stateOrder = 0;

const effects = [];
let effectOrder = 0;

const render = (component, root) => {
    root.innerHTML = component();

    rootComponent = component;
    rootElement = root;
    isFirstRender = false;

    effects.forEach((effect) => {
        const cleanFn = effect.callback();
        effect.cleanFn = cleanFn;
    });

    stateOrder = 0;
    effectOrder = 0;
};

const rerender = debounce(() => {
    effects.forEach((effect) => {
        if (typeof effect.cleanFn === 'function') {
            effect.cleanFn();
        }
    });

    rootElement.innerHTML = rootComponent();

    effects.forEach((effect) => {
        if (!effect.preDependencies) {
            const cleanFn = effect.callback();
            effect.cleanFn = cleanFn;
        } else if (effect.preDependencies.length === 0) {
            return;
        } else {
            effect.preDependencies.forEach((dep, i) => {
                if (dep !== effect.nextDependencies[i]) {
                    const cleanFn = effect.callback();
                    effect.cleanFn = cleanFn;
                }
            });
        }
    });

    stateOrder = 0;
    effectOrder = 0;
});

export const useState = (initialState) => {
    const currentStateOrder = stateOrder;
    let state;

    if (isFirstRender) {
        state = states[currentStateOrder] = initialState;
    } else {
        state = states[currentStateOrder];
    }

    const updater = (newState) => {
        if (typeof newState === 'function') {
            states[currentStateOrder] = newState(states[currentStateOrder]);
        } else {
            states[currentStateOrder] = newState;
        }

        rerender();
    };

    stateOrder++;

    return [state, updater];
};

export const useEffect = (callback, dependencies) => {
    if (!effects[effectOrder]) {
        effects.push({
            callback,
            dependencies,
        });
    } else {
        effects[effectOrder] = {
            callback,
            preDependencies:
                effects[effectOrder].nextDependencies ||
                effects[effectOrder].dependencies, // chỉ chạy vào đây khi rerender lần đầu (chưa kịp có nextDependencies)
            nextDependencies: dependencies,
        };
    }

    effectOrder++;
};

const FPoly = {
    render,
    useState,
    useEffect,
};

export default FPoly;
