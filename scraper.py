#import the library used to query a website
import urllib2
from bs4 import BeautifulSoup
import json
import parse_functions
import stardog_helper

baseUrl = "https://apps.webofknowledge.com"

#Reducing OWL entailment to description logic satisfiability
#startURL = "https://apps.webofknowledge.com/CitedFullRecord.do?product=WOS&colName=WOS&SID=Y2CAgCqQH7dRVUfoDae&search_mode=CitedFullRecord&isickref=WOS:000188096900002"
#startURL = "http://apps.webofknowledge.com/CitedFullRecord.do?product=WOS&colName=WOS&SID=V2yzMLLSvXecK9zXRXa&search_mode=CitedFullRecord&isickref=WOS:000188096900002"
#startURL = "http://apps.webofknowledge.com/CitedFullRecord.do?product=WOS&colName=WOS&SID=S1aCWOwIR27FuyvDFky&search_mode=CitedFullRecord&isickref=WOS:000188096900002"
startURL = "http://apps.webofknowledge.com/CitedFullRecord.do?product=WOS&colName=WOS&SID=R2p2T1OTEK8BcvU7cLW&search_mode=CitedFullRecord&isickref=WOS:000188096900002"

def getCitedURLs(URL):
    citedByPage = urllib2.urlopen(URL)
    citedBySoup = BeautifulSoup(citedByPage, "lxml")

    searchContent = citedBySoup.find_all('div', class_='search-results-content')

    citedBy = []

    for content in searchContent:
        url = baseUrl + content.find("a").get("href")

        title = content.find("value").text

        authorBlob = content.find_all("div")[2].text
        authorsBlob = unicode.split(authorBlob, "By: ")[1]
        authors = unicode.split(authorsBlob, "; ")

        parseURL = [url, title]
        toScan.append(parseURL)
        citedBy.append(title)

        # print parseURL
        # print "Url: %s" % url

    return citedBy

def doParse(parseURL):
    # stop parsing if paper has already been parsed
    if parseURL in scanned:
        return

    #initialize empty values
    title = False
    citedByTitles = False

    print "About to open: %s" % parseURL
    page = urllib2.urlopen(parseURL)
    #initialize
    soup = BeautifulSoup(page, "lxml")

    citeURLs = parse_functions.getCiteURLs(soup, baseUrl)
    citedBy = citeURLs[0]
    citedReferences = citeURLs[1]

    title = parse_functions.getSubject(soup)

    titleFields = parse_functions.getTitleFields(soup)
    abstract = titleFields[0]
    publisher = titleFields[1]
    documentType = titleFields[2]
    language = titleFields[3]
    keywords = titleFields[4]

    authors = parse_functions.getAuthors(soup)

    publishData = parse_functions.getPublishData(soup)
    doi = publishData[0]
    publishDate = publishData[1]

    if citedBy:
        citedByTitles = getCitedURLs(citedBy)



    print "[parsed] %s" % title
    stardog_helper.importData(title, abstract, authors, documentType, language, citedByTitles, publisher, publishDate, doi, keywords)
    print "[imported] %s" % title

toScan = []
scanned = []

doParse(startURL)

while(toScan):
    print "%d urls left to scan\n" % len(toScan)
    nextURL = toScan.pop()[0]
    doParse(nextURL)
    scanned.append(nextURL)

conn.close()