from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import logging
import uvicorn

from main import conversation_with_chatbot
from scrape import scrape_website
from embed import embed_data

app = FastAPI()

CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Define routes
@app.get('/')
def index():
    return 'Welcome to the FastAPI server!'

@app.get('/api/scrape')
async def scrape_website_embed(website_url: str):
    try:
        if website_url:
            scrape_result = scrape_website(website_url)
            if scrape_result:
                embed_result = embed_data()
                if embed_result:
                    return {'msg': 'Success in scraping website'}
            else:
                raise HTTPException(status_code=404, detail='Failure in scraping website')
        else:
            raise HTTPException(status_code=404, detail='Please input the website url')
    except Exception as e:
        logger.error(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail='Internal Server Error')
    
@app.get('/api/chat')
async def chat_with_bot(user_message: str):
    try:
        if user_message:
            predict_function = conversation_with_chatbot()
            message = predict_function(user_message)
            if message:
                return message
            else:
                raise HTTPException(status_code=404, detail='Chatbot is not ready now')
        else:
            raise HTTPException(status_code=404, detail='What do you want')
    except Exception as e:
        logger.error(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail='Internal Server Error')

if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000, debug=True)
