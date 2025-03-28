import streamlit as st
from groq import Groq
from langchain.chains import LLMChain
from langchain_groq import ChatGroq
from langchain.prompts import ChatPromptTemplate, HumanMessagePromptTemplate
from langchain_core.messages import SystemMessage
from langchain.chains.conversation.memory import ConversationBufferWindowMemory
import requests

from fpdf import FPDF
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.pdfgen import canvas
import io
import textwrap

# Function to generate PDF with line breaks
def generate_pdf(itinerary_text):
    # Create a PDF in memory (as a BytesIO object)
    buffer = io.BytesIO()

    # Create a canvas object (this is the actual PDF generator)
    c = canvas.Canvas(buffer, pagesize=letter)

    # Add a title for the itinerary
    c.setFont("Helvetica-Bold", 16)
    c.setFillColor(colors.blue)
    c.drawString(100, 750, "Personalized Itinerary")

    # Line break after title
    c.setFont("Helvetica", 12)
    c.setFillColor(colors.black)

    # Add some space before itinerary content
    c.drawString(100, 730, "Here is your detailed itinerary:")

    # Set starting position for the text
    y_position = 710

    # Set line height and margins
    line_height = 12
    margin = 100

    # Split the input text into lines, ensuring each section appears on a new line
    lines = itinerary_text.splitlines()

    for line in lines:
        # Check if we are near the bottom of the page
        if y_position < 100:  
            c.showPage()  # Create a new page
            c.setFont("Helvetica", 12)
            y_position = 750  # Reset y position for the new page
            c.drawString(margin, y_position, "Here is your detailed itinerary:")
            y_position -= line_height  # Move down after heading

        # Draw each line of the itinerary on the PDF
        c.drawString(margin, y_position, line)
        y_position -= line_height  # Move to the next line

    # Save the PDF to the buffer
    c.showPage()
    c.save()

    # Return the PDF as bytes (for download or further processing)
    buffer.seek(0)
    return buffer.getvalue()

def download_pdf(response):
    pdf_data = generate_pdf(response)

    # Allow the user to download the PDF
    st.download_button(
        label="Download Itinerary as PDF",
        data=pdf_data,  # Passing the byte data here
        file_name="itinerary.pdf",
        mime="application/pdf"
    )


def itinerary_creation():
    """
    Function to create a detailed itinerary based on user inputs.
    """
    # Title of the page
    st.title("Personalized Itinerary Creation")

    # Introduction text
    st.write("Let's plan your personalized trip! I'll help you create a detailed day-wise itinerary based on your preferences, budget, travel dates, and more.")
    
    # Initialize the session state for cities if not already initialized
    if 'cities' not in st.session_state:
        st.session_state.cities = []

    # Allow the user to input a city and add it to the list
    city_input = st.text_input("Enter a city (Press Enter after each city)", key="city_input")

    # Add the city to the list when Enter is pressed
    if city_input:
        st.session_state.cities.append(city_input)
        
    
    # Display the selected cities
    st.write("Selected Cities:")
    for city in st.session_state.cities:
        st.write(f"- {city}")
    
    with st.form(key='itinerary_form'):
                
        # Number of days input
        num_days = st.number_input("How many days will your trip last?", min_value=1, step=1)
        
        # Number of people input
        num_people = st.number_input("How many people are traveling?", min_value=1, step=1)
        
        # Number of adults and children
        num_adults = st.number_input("How many adults are traveling?", min_value=1, step=1)
        num_children = st.number_input("How many children are traveling?", min_value=0, step=1)

        # Budget input in INR
        budget_inr = st.number_input("What’s your approximate budget for the trip (in INR)?", min_value=0, step=5000)
        
        # Budget type selection
        budget_type = st.radio("Would you prefer luxury, mid-range, or budget options?", options=["Luxury", "Mid-range", "Budget"])

        # Activities selection (multiselect)
        activities = st.multiselect(
            "What kind of activities do you enjoy?",
            options=["Sightseeing", "Adventure", "Cultural Tours", "Shopping", "Relaxing on the beach", "Food tours", "Hiking", "Spa & wellness", "Nightlife"]
        )

        # Preferred travel style
        travel_style = st.radio("What travel style best describes you?", options=["Relaxed", "Active", "Adventurous", "Luxury", "Cultural"])

        # Accommodation preferences
        accommodation_type = st.selectbox("What type of accommodation do you prefer?", options=["Hotel", "Resort", "Airbnb", "Hostel", "No Accomodation"])

        # Transportation preferences
        transportation_type = st.selectbox("What mode of transportation do you prefer?", options=["Flights", "Trains", "Public Transport", "Private Transfers", "Self Driven CAR"])

        # Special requests (optional)
        special_requests = st.text_area("Do you have any special requests or preferences? (e.g., wheelchair access, pet-friendly options, honeymoon package)")

        # Submit button
        submit_button = st.form_submit_button("Generate Itinerary")
        
        
    # Initialize session state for chat history
    if 'chat_history' not in st.session_state:
        st.session_state.chat_history = []

    # Setup model and conversation memory
    model = "llama3-8b-8192"
    conversational_memory_length = 8
    memory = ConversationBufferWindowMemory(k=conversational_memory_length, memory_key="chat_history", return_messages=True)

    # System prompt to handle itinerary generation
    system_prompt = (
        "You are an AI travel assistant. Based on the user's preferences (destination, travel dates, number of travelers, budget, preferred activities, and special requests), generate a detailed, day-wise itinerary including flights, hotels, and local activities. Ensure the plan is efficient, cost-effective, and offers flexibility for changes."
    )

    # Step 2: Generate Itinerary
    if submit_button:
        # Prepare user input for LLM processing
        user_input = f"""
        I am planning a trip to {', '.join(st.session_state.cities)} for {num_days} days. The total number of travelers is {num_people}, with {num_adults} adults and {num_children} children. 
        The budget for the trip is {budget_inr} INR. I prefer {budget_type} options for accommodation and activities. 
        We are interested in the following activities: {', '.join(activities)}. 

        For the trip, our travel style is {travel_style}, and we would prefer {accommodation_type} accommodation. 
        As for transportation, we would like {transportation_type} options.

        Here are some special requests or preferences: {special_requests}.
        Based on these details, could you create a detailed, personalized itinerary for us, covering flights, hotels, activities, and local transportation?
        """

        # Initialize Groq Langchain chat object
        groq_api_key = "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"  # Add your Groq API key here
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

        # Display response (itinerary)
        st.write("Here is your personalized itinerary based on your preferences:")
        st.write(response)
        
        pdf_data = generate_pdf(response)

        # You can then serve the `pdf_data` or save it to a file as needed
        with open("itinerary.pdf", "wb") as f:
            f.write(pdf_data)
            
        st.download_button(
        label="Download Itinerary PDF",
        data=pdf_data,
        file_name="itinerary.pdf",
        mime="application/pdf"
    )


if __name__ == "__main__":
    itinerary_creation()
