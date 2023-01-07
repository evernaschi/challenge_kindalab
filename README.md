# Food Trucks Finder
App for finding food trucks near a specific location on a map.

# Instructions

## Setup

1. Install [`Python`][python_setup], [`pip`][pip_setup] and [`virtualenv`][venv_setup] if you do not already have them.

1. Clone this repository:

    ```
    git clone https://github.com/evernaschi/challenge_kindalab.git
    ```

1. In the app directory, create an '.env' file containing:
    ```
    SECRET_KEY = ".... Django secret key ...."
    EXT_API_TOKEN= "App Tokens from https://data.sfgov.org/"
    REACT_APP_GOOGLE_MAPS_API_KEY= "Google Platorm API KEY"
    ```

## How to run local

1. Create a virtualenv.

    ```
    python3 -m venv env
    source env/bin/activate
    ```

1. Install the dependencies needed to run the app.

    ```
    pip install -r requirements.txt
    ```

1. Now sync the database:

    ```
    python manage.py migrate
    ```
 
1. Run the server:

    ```
    python manage.py runserver
    ```

 
1. Run the tests:

    ```
    python manage.py test
    ```

## How to run with Docker

1. Build Docker image.

    ```
    docker build -t food_trucks .
    ```

1. Run Docker container.

    ```
    docker run -p 8080:8000 --name food_trucks_app food_trucks
    ```
1. Go to:

    ```
    Go to http://127.0.0.1:8080/ in your browser.
    ```

## Live website

https://kindalabe.fly.dev/



[python_setup]: https://www.python.org/downloads/
[pip_setup]: https://pypi.org/project/pip/
[venv_setup]: https://pypi.org/project/virtualenv/
