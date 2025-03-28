import streamlit as st
import subprocess

# Set up the page
st.set_page_config(page_title="Agents@TBO", page_icon="✈️", layout="centered")

# Add background image (Beach Photo)
st.markdown("""
    <style>
        .stApp {
            background-image: url('https://th.bing.com/th/id/OIP.WBiy534k5kZKANKtElXNhAHaEK?w=316&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7');
            background-size: cover;
            background-position: center;
            height: 100vh;
            color: white;
        }
        .stButton > button {
            width: 100%;  /* Make buttons fill available width */
            height: 60px;  /* Fixed height for buttons */
            font-size: 18px;  /* Larger font size for readability */
            border-radius: 10px;  /* Rounded corners for a modern look */
            background-color: #4CAF50;  /* Green background */
            color: white;
            border: none;
            transition: background-color 0.3s ease;
        }
        .stButton > button:hover {
            background-color: #45a049;  /* Darker green on hover */
        }
    </style>
""", unsafe_allow_html=True)

# Title
st.title("Welcome to Agents@TBO 🌴")
st.header("Your One-Stop Travel Agent Chatbot Solution")

# Description or additional info (optional)
st.markdown("""
    Agents@TBO is here to help you find the trending travel destinations, create itineraries, find accommodations, discover travel options, and build customized packages for your customers.
""")

# Center the buttons by using columns
col1, col2, col3 = st.columns([1, 2, 1])

with col1:
    st.write("")  # Empty to push the buttons to the center
with col2:
    if st.button("Trending Destinations"):
        subprocess.Popen(["streamlit", "run", "destinations.py"])

    if st.button("Create Itinerary"):
        subprocess.Popen(["streamlit", "run", "itinerary.py"])

    if st.button("Find Accommodations"):
        subprocess.Popen(["streamlit", "run", "find_accommodations.py"])

    if st.button("Find Travel Options"):
        subprocess.Popen(["streamlit", "run", "find_travel_options.py"])

    if st.button("Create Customized Package"):
        subprocess.Popen(["streamlit", "run", "customized_package.py"])
with col3:
    st.write("")  # Empty to align buttons to the center

# Footer (optional)
st.markdown("<hr>", unsafe_allow_html=True)
st.markdown("""
    <footer style="text-align:center;">
        <p>Powered by Agents@TBO</p>
    </footer>
""", unsafe_allow_html=True)
