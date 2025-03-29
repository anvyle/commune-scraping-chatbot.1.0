import os
import json
from langchain.document_loaders import (
    BSHTMLLoader,
    DirectoryLoader,
)
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
import shutil
from dotenv import load_dotenv

def embed_data():
    print("Embeding...")
    try:
        # load_dotenv()

        # if os.path.exists("./chroma"):
        #     shutil.rmtree("./chroma")
        
        # os.mkdir("./chroma")

        loader = DirectoryLoader(
            "./scrape",
            glob="*.html",
            loader_cls=BSHTMLLoader,
            show_progress=True,
            loader_kwargs={"get_text_separator": " "},
        )
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
        )
        data = loader.load()
        documents = text_splitter.split_documents(data)

        # Load sitemap
        with open("./scrape/sitemap.json", "r") as f:
            sitemap = json.load(f)

        # Map sources from file directory to web source
        for document in documents:
            source = document.metadata["source"].replace(".html", "").replace("scrape/", "scrape\\")
            document.metadata["source"] = sitemap.get(source, "")

        embedding_model = OpenAIEmbeddings(model="text-embedding-ada-002")
        db = Chroma.from_documents(documents, embedding_model, persist_directory="./chroma")
        db.persist()
        return True
    except Exception as e:
        print(f"An error occurred: {e}")
        return False
