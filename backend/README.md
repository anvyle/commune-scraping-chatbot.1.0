# Scraping Chatbot

## Overview

This project is a scraping chatbot designed to extract information from websites and provide it to users in a conversational manner. The chatbot utilizes web scraping techniques to gather data from specified URLs and then presents the information to the user upon request.

## Features

- **Web Scraping:** Utilizes web scraping libraries to extract information from target websites.
- **Conversational Interface:** Interacts with users in a conversational manner, accepting queries and providing relevant information.
- **Customizable Scraping Rules:** Allows customization of scraping rules to adapt to different website structures.
- **Error Handling:** Implements robust error handling mechanisms to handle unexpected situations gracefully.
- **Multi-platform Support:** Can be deployed on various platforms including web, desktop, and messaging platforms.

## Installation

    ```
    pip install -r requirements.txt
    ```

## Usage

1. Configure scraping environment:

    Write you OPENAI_API_KEY in .env file

2. Run the chatbot:

    ```
    flask --app chatbot run
    ```

3. Interact with the chatbot:

    Once the chatbot is running, you can start interacting with it by sending queries or commands.

## Example Queries

- "Get me the latest news about technology."
- "What are the top headlines from CNN?"
- "Show me the weather forecast for New York."
- "Find the current price of Bitcoin."

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Create a new Pull Request.

## Acknowledgments

- Thanks to Beautifulsoup and langchain for providing the web scraping functionality.