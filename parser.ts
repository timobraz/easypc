const inp =
  "<CPU> 12900KF <GPU> 4090 <RAM> 32GB <MOBO> Z690 GAMING MAG <PSU> Corsair RM850x (2020) <STORAGE> 2x 1TB M.2-2280 PCIE 4.0 X4 NVME SSD <CASE> Corsair 4000D Airflow";
// console.log(parsePc(inp));

//input =<CPU> 12900KF <GPU> 4090 <RAM> 32GB <MOBO> Z690 GAMING MAG <PSU> Corsair RM850x (2020) <STORAGE> 2x 1TB M.2-2280 PCIE 4.0 X4 NVME SSD <CASE> Corsair 4000D Airflow
//write a function that parses the different pc parts into an object
function parsePCParts(input: string): any {
  let pcParts: any = {};
  let parts = input.split("<");
  parts.shift();
  parts.forEach((part) => {
    let [type, ...rest] = part.split(">");
    pcParts[type] = rest.join(">");
  });
  return pcParts;
}
// parsePCParts(inp);
// console.log(parsePCParts(inp)); // Test the parser
// const input = `<CPU>12900KF\n<GPU> RTX 4070 Ti\n<RAM> 32GB (2 x 16GB) G.Skill Ripjaws S5 6000MHz\n<MOBO> Asus ROG STRIX Z790-A GAMING WIFI ATX LGA1700\n<PSU> Corsair RM1000x (2021) 1000 W 80+ Gold Certified Fully Modular ATX Power Supply\n<STORAGE> 2 x Samsung 990 Pro 2TB M.2-2280 PCIe 4.0 X4 NVME Solid State Drive\n<CASE> Lian Li O11 Dynamic EVO ATX Mid Tower\n`;

// console.log(parsePCParts(input));
export default parsePCParts;
