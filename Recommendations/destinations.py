import streamlit as st
from groq import Groq
from langchain.chains import LLMChain
from langchain_groq import ChatGroq
from langchain.prompts import ChatPromptTemplate, HumanMessagePromptTemplate
from langchain_core.messages import SystemMessage
from langchain.chains.conversation.memory import ConversationBufferWindowMemory
import requests
from PIL import Image
from io import BytesIO


def main():
    """
    Main function to set up the travel assistant chatbot with updated configurations.
    """

    # Get Groq API key
    groq_api_key = "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"

    # The title and greeting message of the Streamlit application
    st.title("Travel Assistant - Powered by Groq!")
    st.write("Hello! I'm your smart and friendly travel assistant. Let's plan your journey together! Please provide the following details:")

    # Form to collect travel details from the user
    with st.form(key='travel_form'):
        source_location = st.text_input("Enter your source location:")
        trip_type = st.selectbox("Select trip type:", ["Domestic", "International"])
        travel_group = st.selectbox("Who are you traveling with?", ["Family", "Friends", "Couple"])
        radius = st.number_input("Optional: Enter the radius in km (leave empty for no preference):", min_value=0)
        submit_button = st.form_submit_button("Get Travel Recommendations")

    # Initialize session state for chat history
    if 'chat_history' not in st.session_state:
        st.session_state.chat_history = []

    # Setup model and conversation memory
    model = "llama3-8b-8192"
    conversational_memory_length = 8
    memory = ConversationBufferWindowMemory(k=conversational_memory_length, memory_key="chat_history", return_messages=True)

    # System prompt to handle travel recommendations
    system_prompt = (
        "You are a smart and friendly travel assistant. Based on the user's preferences, recommend 5 trending travel destinations, including their famous tourist attractions. "
        "The recommendations should also account for user’s trip type (domestic or international), travel group (family, friends, couple), and optional radius for location preference."
    )

    # When form is submitted, process the inputs and generate recommendations
    if submit_button:
        # Prepare user input for LLM processing
        user_input = f"Source Location: {source_location}, Trip Type: {trip_type}, Travel Group: {travel_group}, Radius: {radius if radius else 'N/A'}"

        # Initialize Groq Langchain chat object
        groq_chat = ChatGroq(
            groq_api_key=groq_api_key,
            model_name=model
        )

        # Construct a chat prompt template
        prompt = ChatPromptTemplate.from_messages(
            [
                SystemMessage(content=system_prompt),  # Persistent system prompt
                HumanMessagePromptTemplate.from_template("{human_input}"),  # User input template
            ]
        )

        # Create a conversation chain
        conversation = LLMChain(
            llm=groq_chat,
            prompt=prompt,
            verbose=True,
            memory=memory,
        )

        # Generate the chatbot response
        response = conversation.predict(human_input=user_input)

        # Store the conversation in the session state
        message = {'human': user_input, 'AI': response}
        st.session_state.chat_history.append(message)

        # Display response (travel recommendations)
        st.write("Here are the top 5 trending destinations based on your preferences:")
        st.write(response)



if __name__ == "__main__":
    main()
