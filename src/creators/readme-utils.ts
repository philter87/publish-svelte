import {PelteOptions} from "../pelte-options";

export const formatName = (opts: PelteOptions): string => {
    return opts.componentName.charAt(0).toLocaleLowerCase() + opts.componentName.substring(1);
};

function existsProp(opts: PelteOptions) {
    return opts.componentProps && opts.componentProps.length > 0;
}

export function getPropsObjectExample(opts: PelteOptions) {
    return existsProp(opts) ? `, props: { ${opts.componentProps[0]}: 'Init Value' }` : ''
}

export function getPropAdjustExample(opts: PelteOptions) {
    return existsProp(opts) ? `${formatName(opts)}.${opts.componentProps[0]} = 'Updated Value';` : ''
}

export function getOtherPropsIfAny(opts: PelteOptions) {
    return existsProp(opts) && opts.componentProps.length > 1 ? `\n// Other props: ${opts.componentProps.slice(1).join(', ')}` : '';
}

export function existsCe(opts: PelteOptions) {
    return (opts.webComponentInfo && opts.webComponentInfo.exists);
}

export function getCeName(opts: PelteOptions) {
    return existsCe(opts) ? opts.webComponentInfo.name : 'name-of-ce';
}

export function getCeProp(opts: PelteOptions) {
    return existsProp(opts) ? opts.componentProps[0] + '="Init Value" ' : ' ';
}