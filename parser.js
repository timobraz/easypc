const parsePCParts = (input) => {
    const parts = {};

    const lines = input.split('\n').filter(line => line.trim().length > 0);

    for (const line of lines) {
        const match = line.match(/^<(\w+)>\s*(.*)$/);

        if (match) {
            const key = match[1];
            const value = match[2].trim();

            if (key in parts && Array.isArray(parts[key])) {
                parts[key].push(value);
            } else {
                parts[key] = value;
            }
        }
    }

    return parts;
};

// Test the parser
const input = `<CPU>12900KF\n<GPU> RTX 4070 Ti\n<RAM> 32GB (2 x 16GB) G.Skill Ripjaws S5 6000MHz\n<MOBO> Asus ROG STRIX Z790-A GAMING WIFI ATX LGA1700\n<PSU> Corsair RM1000x (2021) 1000 W 80+ Gold Certified Fully Modular ATX Power Supply\n<STORAGE> 2 x Samsung 990 Pro 2TB M.2-2280 PCIe 4.0 X4 NVME Solid State Drive\n<CASE> Lian Li O11 Dynamic EVO ATX Mid Tower\n`;

console.log(parsePCParts(input));
