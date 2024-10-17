export function generateProductSkuPart(productName: string) {
    if (!productName) {
        return "XXXX";
    }

    const words = productName.trim().split(/\s+/);
    const vowels = ['a', 'e', 'i', 'o', 'u'];

    let sku = words[0][0].toUpperCase();
    for (let i = 1; i < words.length; i++) {
        for (let char of words[i]) {
            if (!vowels.includes(char.toLowerCase())) {
                sku += char.toUpperCase();
            }
            if (sku.length === 4) break;
        }
        if (sku.length === 4) break;
    }
    return sku.padEnd(4, 'X');
}