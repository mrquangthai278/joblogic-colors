const hexToRgb = (hex) => {
    hex = hex.replace(/^#/, "");

    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
}

const rgbToHex = (r, g, b) => {
    return (
        "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
    );
}

export const mixColors = (color1, color2, color3, color4) => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    const rgb3 = hexToRgb(color3);
    const rgb4 = hexToRgb(color4);

    const mixedColor = {
        r: Math.round((rgb1.r + rgb2.r + rgb3.r + rgb4.r) / 4),
        g: Math.round((rgb1.g + rgb2.g + rgb3.g + rgb4.g) / 4),
        b: Math.round((rgb1.b + rgb2.b + rgb3.b + rgb4.b) / 4)
    };

    const mixedHex = rgbToHex(mixedColor.r, mixedColor.g, mixedColor.b);

    return mixedHex;
}

export const isBlackOrWhite = (color) => {
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? 'white' : 'black';
}

