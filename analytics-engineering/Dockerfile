FROM python:3.11-slim

WORKDIR /app

# Install curl and git (needed for dbt debug), then clean up
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl git && \
    curl -LsSf https://astral.sh/uv/install.sh | sh && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Add uv to PATH
ENV PATH="/root/.local/bin:${PATH}"

# Copy pyproject.toml first for dependency installation
COPY pyproject.toml .

# Install Python dependencies using uv
RUN uv pip install --system .

# Copy the rest of the project files
COPY . .