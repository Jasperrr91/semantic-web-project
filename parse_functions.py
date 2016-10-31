from bs4 import NavigableString

def getCiteURLs(soup, baseUrl):
    citedBy = False
    all_links = soup.find_all("a")
    cite_block = soup.find('div', class_='block-text-content')
    cite_links = cite_block.find_all("a", limit=2)
    cite_count = cite_block.find("span", class_="TCcountFR").contents[0]

    if cite_count == "0":
        citedReferences = baseUrl + "/" + cite_links[0].get("href")
    else:
        citedBy = baseUrl + "/" + cite_links[0].get("href")
        citedReferences = baseUrl + "/" + cite_links[1].get("href")

    return [citedBy, citedReferences]

def getSubject(soup):
    subjectField = soup.find("div", class_="title")
    subject = subjectField.contents[1].contents[0]

    return subject

def getAuthors(soup):
    frFields = soup.find_all("p", class_="FR_field")

    for frField in frFields:
        frLabel = frField.find("span", class_="FR_label")

        if frLabel.text == "By:":
            authors = []
            rawAuthors = frField.find_all("a", title="Find more records by this author")
            for rawAuthor in rawAuthors:
                author = rawAuthor.text
                authors.append(author)

            return authors

def getPublishData(soup):
    doi = False
    publishDate = False

    frLabels = soup.find_all("span", class_="FR_label")

    for frLabel in frLabels:
        if frLabel.contents[0] == "DOI:":
            doi = frLabel.nextSibling.nextSibling.contents

        if frLabel.contents[0] == "Published:":
            publishDate = frLabel.nextSibling.nextSibling.contents

    return [doi, publishDate]

def getTitleFields(soup):
    abstract = False
    keywords = False
    documentType = False
    language = False
    publisher = False

    titleFields = soup.find_all("div", class_="title3")

    for titleField in titleFields:
        if titleField.contents[0] == "Abstract":
            abstract = titleField.nextSibling.nextSibling.text

        if titleField.contents[0] == "Publisher":
            publisher = titleField.nextSibling.nextSibling.contents[1].text

        if titleField.contents[0] == "Document Information":
            rawDocumentType = titleField.nextSibling.nextSibling
            rawLanguage = rawDocumentType.nextSibling.nextSibling

            documentType = rawDocumentType.contents[2].split("; ")
            language = rawLanguage.contents[2].split("; ")

        if titleField.contents[0] == "Keywords":
            rawKeywords = titleField.nextSibling.nextSibling.contents
            rawKeywords.pop(0)
            rawKeywords.pop(0)

            keywords = []

            for rawKeyword in rawKeywords:
                if isinstance(rawKeyword, NavigableString):
                    continue

                rawKeyword = rawKeyword.contents[0]

                keywords.append(rawKeyword)

    return [abstract, publisher, documentType, language, keywords]