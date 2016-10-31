# Web of Knowledge scraper

## Installation:

* "clone" the source code from Bitbucket. Type: `git clone https://bitbucket.org/Jasperrr/semanticweb.git`
* Setup a virtual environment `virtualenv .`
* Install BeautifulSoup `pip install BeautifulSoup4`
* Install Lxml `pip install lxml`
* Install RDFLib `pip install rdflib`
* Update your SID in the startURL in `scraper.py`
* Make sure Stardog is running and edit the target database in `stardog_helper.py` if needed
* Run with `python scraper.py`