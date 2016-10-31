from rdflib import URIRef, BNode, Literal, Namespace, Graph
from rdflib.namespace import RDF, FOAF, RDFS, OWL
from rdflib.plugins.stores import sparqlstore
import urllib

endpoint = 'http://localhost:5820/app/query'


def importData(title, abstract, authors, documentType, language, citedBy, publisher, publishDate, doi, keywords):
    store = sparqlstore.SPARQLUpdateStore()
    store.open((endpoint, endpoint))

    default_graph = URIRef("http://www.semanticweb.org/mbonnee/papers/")
    ng = Graph(store, identifier=default_graph)

    n = Namespace("http://www.semanticweb.org/mbonnee/papers/")

    g = Graph()

    #newPaper = n[title.replace(" ", "_")]
    newPaper = n[urllib.quote(title.replace(" ", "_"), safe='')]

    g.add( (newPaper, RDF.type, n.Document) )
    g.add( (newPaper, n.hasSubject, Literal(title)) )
    g.add( (newPaper, n.abstract, Literal(abstract)) )

    if language:
        languageURI = n[language[0]]
        g.add( (languageURI, RDF.type, n.Language) )
        g.add( (newPaper, n.inLanguage, languageURI) )

    if citedBy:
        for cite in citedBy:
            #citeURI = n[cite.replace(" ", "_").replace(":", "").replace(".", "")]
            citeURI = n[urllib.quote(cite.replace(" ", "_"), safe='')]
            g.add( (citeURI, RDF.type, n.Document) )
            g.add( (newPaper, n.isCitedBy, citeURI) )
            g.add((citeURI, n.isCiting, newPaper))

    if authors:
        for author in authors:
            #authorURI = n[author.replace(" ", "_").replace(",", "")]
            authorURI = n[urllib.quote(author.replace(" ", "_"), safe='')]
            g.add( (authorURI, RDF.type, n.Person) )
            g.add( (authorURI, RDFS.label, Literal(author)) )
            g.add( (newPaper, n.hasAuthor, authorURI) )
            g.add((authorURI, n.isAuthorOf, newPaper))

    if keywords:
        for keyword in keywords:
            #keywordURI = n[keyword.replace(" ", "_")]
            keywordURI = n[urllib.quote(keyword.replace(" ", "_"), safe='')]
            g.add( (keywordURI, RDF.type, n.Keyword) )
            g.add( (keywordURI, RDFS.label, Literal(keyword)) )
            g.add( (newPaper, n.hasKeyword, keywordURI) )

    if documentType:
        for type in documentType:
            #typeURI = n[type.replace(" ", "_")]
            typeURI = n[urllib.quote(type.replace(" ", "_"), safe='')]
            g.add( (typeURI, RDF.type, n.Document_Type) )
            g.add( (typeURI, RDFS.label, Literal(type)) )
            g.add( (newPaper, n.hasType, typeURI) )


    if publisher:
        publisherInfo = publisher.split(',', 1)
        publisherName = publisherInfo[0]
        publisherAddress = publisherInfo[1]
        #publisherURI = n[publisherName.replace(" ", "_")]
        publisherURI = n[urllib.quote(publisherName.replace(" ", "_"), safe='')]

        g.add( (publisherURI, RDF.type, n.Publisher) )
        g.add( (publisherURI, RDFS.label, Literal(publisherName)) )
        g.add( (publisherURI, n.hasAddress, Literal(publisherAddress)) )
        g.add( (newPaper, n.publishedBy, publisherURI))

    if publishDate:
        g.add( (newPaper, n.publishedOn, Literal(publishDate[0])))

    if doi:
        #doiURI = n[doi[0].replace(".", "-").replace("/", "_")]
        doiURI = n[urllib.quote(doi[0].replace(" ", "_"), safe='')]
        g.add( (doiURI, RDF.type, n.DOI) )
        g.add( (doiURI, RDFS.label, Literal(doi[0])) )
        g.add( (doiURI, OWL.sameAs, newPaper) )
        g.add( (newPaper, n.hasDOI, doiURI) )

    ng.update(
        u'INSERT DATA { %s }' % g.serialize(format='nt')
    )