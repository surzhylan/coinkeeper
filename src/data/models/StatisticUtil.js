export const colors = [
    '#B21F00',
    '#C9DE00',
    '#2FDE00',
    '#00A6B4',
    '#0003b4',
    '#b400a5',
    '#b46c00',
    '#00b49f',
    '#1f5f22',
    '#000000',
    '#ffffff',
    'rgba(155,154,154,0.45)',
]

export function getColors(length): Array {
    return (colors.length > length)
        ? colors.slice(0, length)
        : colors.push(...getColors(colors.length - length))
}