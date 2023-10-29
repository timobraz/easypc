import time

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# new driver
options = webdriver.ChromeOptions()
options.add_argument("user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36")
driver = webdriver.Chrome(options=options)


# def getBuild(urlInput):
#     print("getBuild")
#     print(urlInput)
#     # Navigate to the page
#     url = urlInput
#     driver.get(url)
#
#     # Scrape the build name
#     build_name = driver.find_element(By.CLASS_NAME, "pageTitle").text
#
#     # Scrape the build description
#     description = driver.find_element(By.CLASS_NAME, "markdown").text
#
#     # Scrape the build price with class name "td__price" in a <td> tag
#     total_price_element = driver.find_element(By.CSS_SELECTOR, "td.td__price")
#     total_price = total_price_element.text
#
#     # Scrape the list of parts if the td__component is a CPU, GPU, or Memory using list comprehension and zip
#     parts_elements = driver.find_elements(By.CLASS_NAME, "td__component")
#     parts_nameAndPrice = driver.find_elements(By.CLASS_NAME, "td__name")
#     partsZIP = zip(parts_elements, parts_nameAndPrice)
#     parts_list = [(element[0].text, element[1].text.split('\n')[0], element[1].text.split('\n')[1]) for element in
#                   partsZIP if element[0].text in (
#                       ("CPU", "Video Card", "Memory", "Motherboard", "Storage", "Power Supply", "Case"))]
#
#     # print (parts_list)
#
#     # Print the scraped details
#     print("Build Name:", build_name)
#     print("\nDescription:\n", description)
#     print("\nPrice:", total_price)
#     print("\nParts List:")
#     for part in parts_list:
#         print("\t", part[0] + ": ", part[1], part[2])


from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException, WebDriverException


def getBuild(urlInput):
    options = webdriver.ChromeOptions()
    options.add_argument("user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36")
    driver = webdriver.Chrome(options=options)
    ## wait 2 seconds
    time.sleep(2)
    print("getBuild")
    print(urlInput)

    # Navigate to the page
    driver.get(urlInput)

    time.sleep(2)

    wait = WebDriverWait(driver, 30)  # wait for up to 20 seconds

    try:
        # Wait for the build name to appear and then scrape it
        build_name = wait.until(EC.presence_of_element_located((By.CLASS_NAME, "pageTitle"))).text

        # Wait for the build description to appear and then scrape it
        description = wait.until(EC.presence_of_element_located((By.CLASS_NAME, "markdown"))).text

        # Wait for the build price to appear and then scrape it
        total_price_element = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "td.td__price")))
        total_price = total_price_element.text

        # Scrape the list of parts
        parts_elements = wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, "td__component")))
        parts_nameAndPrice = wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, "td__name")))

        partsZIP = zip(parts_elements, parts_nameAndPrice)
        # for element in partsZIP:
        #     print(element[1].text)
        #     break
        parts_list = [(element[0].text, element[1].text.split('\n')[0], element[1].text.split('\n')[1]) for element
                      in
                      partsZIP if element[0].text in (
                          ("CPU", "Video Card", "Memory", "Motherboard", "Storage", "Power Supply", "Case")) and len(element[1].text.split('\n')) == 2]

        # Print the scraped details
        print("Build Name:", build_name)
        print("\nDescription:\n", description)
        print("\nPrice:", total_price)
        print("\nParts List:")
        for part in parts_list:
            print("\t", part[0] + ": ", part[1], part[2])

        ## add to file
        f = open("old/builds2.txt", "a")
        f.write("Build Name: " + build_name + "\n")
        f.write("Description: " + description + "\n")
        f.write("Price: " + total_price + "\n")
        f.write("Parts List: \n")
        for part in parts_list:
            f.write("\t" + part[0] + ": " + part[1] + " " + part[2] + "\n")
        f.write("\n\n")
        f.close()
    except TimeoutException:
        print(f"Timed out waiting for elements to appear on {urlInput}!")


def getAllBuilds():
    # loop through all builds
    for i in range(1, 10):
        try:
            ## start url
            urlTemp = 'https://pcpartpicker.com/builds/#g=538,541,540,379,380,378,373,369,415,367,390,525,443,500,476,439,450,438,186,185,224,130,165,221,173,436,514,446,425,447,427,448,424,518,499,546,497,513,494,508,506,492,507,516,505,493,520,552,553,550,549,542,539,478,484,445,444,521,517,511,509,522,526,501,523,495,496,498,524,554,558,559,547,548,404,405,527,510,529,530,504,535,435,417,375,393,402,403&s=33,41,14,15,39,37,16,40,21,28,35&X=25000,550000&G=1&page=' + str(i)
            driver.get(urlTemp)

            # Wait for the build links to appear
            wait = WebDriverWait(driver, 30)  # wait for up to 30 seconds

            build_links = wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, "logGroup__target")))
            print(build_links[0].get_attribute('outerHTML'))
            urls = [link.get_attribute('href') for link in build_links]
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

## read in urls from file
urls = []
with open("urls.txt", "r") as f:
    urls = f.readlines()


#     close
f.close()


# Iterate through each URL and scrape data
for url in urls:
    # Start a new browser session
    driver = webdriver.Chrome()
    driver.get(url)
    getBuild(url)  # This is your scraping function
    driver.quit()  # Close the browser session

getBuild("https://pcpartpicker.com/b/9MK323")