import json
import time

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException, WebDriverException

options = webdriver.ChromeOptions()
options.add_argument("--headless")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
# options.add_argument(
#     "user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
# )
driver = webdriver.Chrome(options=options)


def create_jsonl_file(
    price, name, description, cpu, gpu, ram, mobo, psu, storage, case
):
    with open("output.jsonl", "a") as file:
        data = {
            "text": f"<s>[INST] <<SYS>>\nYou are an AI focused on generating lists of PC components based on given user requirements. Your task is to provide a list of recommended parts in a specific order followed by explanations for each choice. Your responses should be clear, concise, and informative. Do not engage in regular conversation with the user. Always ensure that your recommendations are based on the information provided and are well-reasoned.\n<</SYS>>\n\n {price} Build: {name}, {description} [/INST] [<CPU> {cpu}; <GPU> {gpu}; <RAM> {ram}; <MOBO> {mobo}; <PSU> {psu}; <STORAGE> {storage}; <CASE> {case}]"
        }
        file.write(json.dumps(data) + "\n")


def getBuild(urlInput):
    # go to google.com

    ## wait 2 seconds
    print("getBuild")
    print(urlInput)

    # Navigate to the page

    time.sleep(2)
    driver.get(urlInput)

    driver.add_cookie(
        {
            "name": "xcsrftoken",
            "value": "4QtJn4lfmjYdGgtEP9bsyEUsazTcEpMjYZRn8TjrLtpJvosG0kXj1b7YQN1iX7PO",
        }
    )
    # __cf_bm=POuRd8BShc4HyK2HATP4JDu2nexzCVa5NeuyIVGzyTs-1698561406-0-AQnTKRuiZkG4OgaXJ7Wbt1RbuBsGWzRx3sneFLfGhyFlBqCIv8nVua3hGCu3ll8NbivGB6cYU9L/vVhVrggSe94=; cf_clearance=4E5S6P6_Ei7TRTdwQHg0wYzJMnHlO8VvSXAjxayUgbY-1698561407-0-1-217ba70.4b09a98d.912d3306-0.2.1698561407; xsessionid=6mcd0kzue994cdoygqbvwal2rrvngx53; xcsrftoken=4QtJn4lfmjYdGgtEP9bsyEUsazTcEpMjYZRn8TjrLtpJvosG0kXj1b7YQN1iX7PO
    driver.add_cookie(
        {
            "name": "__cf_bm",
            "value": "CE_hQrISQEvMIg4VSPVyQjvaFAzewB1kGNDMIGePEvM-1698565788-0-AZBlI5vQc4wWlFbYEzHRPwWdYV2zaI4Y/igCgMQrypy8chKBSEERmDpbTcnpcHeLpbeC0VM6zqD6+nuahhR1tz4=",
        }
    )
    driver.add_cookie(
        {
            "name": "cf_clearance",
            "value": "4E5S6P6_Ei7TRTdwQHg0wYzJMnHlO8VvSXAjxayUgbY-1698561407-0-1-217ba70.4b09a98d.912d3306-0.2.1698561407",
        }
    )
    driver.add_cookie(
        {"name": "xsessionid", "value": "6mcd0kzue994cdoygqbvwal2rrvngx53"}
    )
    time.sleep(2)

    wait = WebDriverWait(driver, 30)  # wait for up to 20 seconds

    try:
        # Wait for the build name to appear and then scrape it
        build_name = wait.until(
            EC.presence_of_element_located((By.CLASS_NAME, "pageTitle"))
        ).text

        # Wait for the build description to appear and then scrape it
        description = wait.until(
            EC.presence_of_element_located((By.CLASS_NAME, "markdown"))
        ).text

        # Wait for the build price to appear and then scrape it
        total_price_element = wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "td.td__price"))
        )
        total_price = total_price_element.text

        # Scrape the list of parts
        parts_elements = wait.until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, "td__component"))
        )
        parts_nameAndPrice = wait.until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, "td__name"))
        )

        print([nap.text for nap in parts_nameAndPrice])
        # print(parts_nameAndPrice)
        partsZIP = zip(parts_elements, parts_nameAndPrice)
        return
        ## if it doesn't have "CPU", "Video Card", "Memory", "Motherboard", "Storage", "Power Supply", "Case" in it, then just skip it
        # if not any(
        #     element[0].text
        #     in (
        #         "CPU",
        #         "Video Card",
        #         "Memory",
        #         "Motherboard",
        #         "Storage",
        #         "Power Supply",
        #         "Case",
        #     )
        #     for element in partsZIP
        # ):
        #     ##print the element[0].text

        #     return

        ##dictionary comprehension of parts, i.e. CPU: Intel i9
        partsDictionary = {
            element[0].text: element[1].text.split("\n")[0]
            for element in partsZIP
            if element[0].text
            in (
                (
                    "CPU",
                    "Video Card",
                    "Memory",
                    "Motherboard",
                    "Storage",
                    "Power Supply",
                    "Case",
                )
            )
            and len(element[1].text.split("\n")) == 2
        }

        print(partsDictionary)

        # for element in partsZIP:
        #     print(element[1].text)
        #     break
        # parts_list = [(element[0].text, element[1].text.split('\n')[0], element[1].text.split('\n')[1]) for element
        #               in
        #               partsZIP if element[0].text in (
        #                   ("CPU", "Video Card", "Memory", "Motherboard", "Storage", "Power Supply", "Case")) and len(element[1].text.split('\n')) == 2]

        ## get cpu from parts ZIP, i.e. if element[0].text == "CPU". Find CPU name in parts
        CPU = partsDictionary["CPU"]
        print(CPU)
        GPU = partsDictionary["Video Card"]
        print(GPU)
        RAM = partsDictionary["Memory"]
        print(RAM)
        MOBO = partsDictionary["Motherboard"]
        print(MOBO)
        PSU = partsDictionary["Power Supply"]
        print(PSU)
        STORAGE = partsDictionary["Storage"]
        print(STORAGE)
        CASE = partsDictionary["Case"]
        print(CASE)

        # Print the scraped details
        print("Build Name:", build_name)
        print("\nDescription:\n", description)
        print("\nPrice:", total_price)
        print("\nParts List:")
        # for part in parts_list:
        #     print("\t", part[0] + ": ", part[1], part[2])
        print("\t", "CPU: ", CPU)
        print("\t", "GPU: ", GPU)
        print("\t", "RAM: ", RAM)
        print("\t", "MOBO: ", MOBO)
        print("\t", "PSU: ", PSU)
        print("\t", "STORAGE: ", STORAGE)
        print("\t", "CASE: ", CASE)

        ## add to file
        # create_jsonl_file("High-end", "Gaming Beast", "Built for intensive gaming sessions", "Intel i9", "Nvidia RTX 3090", "32GB DDR4", "ASUS ROG", "750W", "1TB SSD + 2TB HDD", "Cooler Master H500P")
        # create_jsonl_file(total_price, build_name, description, parts_list[0][1], parts_list[1][1], parts_list[2][1], parts_list[3][1], parts_list[4][1], parts_list[5][1], parts_list[6][1])
        f.close()
    except TimeoutException:
        print(f"Timed out waiting for elements to appear on {urlInput}!")


def getAllBuilds():
    # loop through all builds
    for i in range(1, 10):
        try:
            ## start url
            urlTemp = (
                "https://pcpartpicker.com/builds/#g=538,541,540,379,380,378,373,369,415,367,390,525,443,500,476,439,450,438,186,185,224,130,165,221,173,436,514,446,425,447,427,448,424,518,499,546,497,513,494,508,506,492,507,516,505,493,520,552,553,550,549,542,539,478,484,445,444,521,517,511,509,522,526,501,523,495,496,498,524,554,558,559,547,548,404,405,527,510,529,530,504,535,435,417,375,393,402,403&s=33,41,14,15,39,37,16,40,21,28,35&X=25000,550000&G=1&page="
                + str(i)
            )
            driver.get(urlTemp)

            # Wait for the build links to appear
            wait = WebDriverWait(driver, 30)  # wait for up to 30 seconds

            build_links = wait.until(
                EC.presence_of_all_elements_located((By.CLASS_NAME, "logGroup__target"))
            )
            print(build_links[0].get_attribute("outerHTML"))
            urls = [link.get_attribute("href") for link in build_links]
            print(urls)

            # Save urls to file
            with open("urls.txt", "a") as f:
                for url in urls:
                    f.write(url + "\n")

        except TimeoutException:
            print(f"Timed out waiting for build links to appear on page {i}!")
        except WebDriverException as e:
            print(f"WebDriverException occurred on page {i}: {e}")
        except Exception as e:
            print(f"An error occurred on page {i}: {e}")


# getAllBuilds()

# read in urls from file
urls = []
with open("urls.txt", "r") as f:
    urls = f.readlines()


# close
f.close()

# Iterate through each URL and scrape data
for url in urls:
    # Start a new browser session
    driver = webdriver.Chrome()
    getBuild(url)  # This is your scraping function
    driver.quit()  # Close the browser session

# getBuild("https://pcpartpicker.com/b/9MK323")

# create_jsonl_file("High-end", "Gaming Beast", "Built for intensive gaming sessions", "Intel i9", "Nvidia RTX 3090", "32GB DDR4", "ASUS ROG", "750W", "1TB SSD + 2TB HDD", "Cooler Master H500P")
# create_jsonl_file("HIIIIIIIII", "UR MOMMMMMMM", "Built for intensive gaming sessions", "PLEASEEEEEE", "HELPPPPP", "32GB DDR4", "ASUS ROG", "SAVE MEEEEEE", "1TB SSD + 2TB HDD", "PLEASE")
