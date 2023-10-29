type Build = {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
    motherboard: string;
    psu: string;
}

function consume(str: string, idx: number): string {
    if (idx == -1) return '';

    let out_str = '';
    let count = 0;
    while (str[0 + count] != '\n') {
        if (['<', '>', ':'].includes(str[0 + count])) continue;

        out_str += str[0];
        count++;
    }
    return out_str;
}

function build_parser(str: string): Build {
    let ram_idx = Math.max(str.toLowerCase().indexOf('ram') + 3, str.toLowerCase().indexOf('memory') + 6);
    let psu_idx = Math.max(str.toLowerCase().indexOf('psu') + 3, str.toLowerCase().indexOf('power supply') + 12);

    return {
        cpu: consume(str, str.toLowerCase().indexOf('cpu') + 3).trim(),
        gpu: consume(str, str.toLowerCase().indexOf('gpu') + 3).trim(),
        ram: consume(str, ram_idx).trim(),
        storage: consume(str, str.toLowerCase().indexOf('storage') + 7).trim(),
        motherboard: consume(str, str.toLowerCase().indexOf('motherboard') + 11).trim(),
        psu: consume(str, psu_idx).trim(),
    }
}