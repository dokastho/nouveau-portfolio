FROM python:3.9.6

WORKDIR /app

COPY . /app

# Install dependencies
RUN python3 -m pip install --no-cache-dir -r requirements.txt
RUN pip install -e .

# # Build frontend
# RUN mkdir /app/porto/static/js
# WORKDIR /app/apple_xdt_server
# ENV NODE_VERSION=22.7.0
# RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
# ENV NVM_DIR=/root/.nvm
# RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
# RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
# RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
# ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
# RUN node --version
# RUN npm --version
# RUN npm i
# RUN npm run build
# WORKDIR /app

# Expose the port Flask runs on
EXPOSE 8002

# Set environment variables
ENV FLASK_APP=porto_tj
ENV FLASK_RUN_HOST=0.0.0.0
ENV VIRTUAL_HOST=dokastho.io
ENV VIRTUAL_PORT=8002
ENV PYTHONUNBUFFERED=0
ENV PROD=1

# Command to run the application
CMD ["python3", "wsgi.py"]
