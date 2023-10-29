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
        out_str += str[0];
        count++;
    }
    return out_str;
}

function build_parser(str: string): Build {
    let ram_idx = Math.max(str.toLowerCase().indexOf('ram'), str.toLowerCase().indexOf('memory'));
    let psu_idx = Math.max(str.toLowerCase().indexOf('psu'), str.toLowerCase().indexOf('power supply'));

    return {
        cpu: consume(str, str.toLowerCase().indexOf('cpu')),
        gpu: consume(str, str.toLowerCase().indexOf('gpu')),
        ram: consume(str, ram_idx),
        storage: consume(str, str.toLowerCase().indexOf('storage')),
        motherboard: consume(str, str.toLowerCase().indexOf('motherboard')),
        psu: consume(str, psu_idx),
    }
}