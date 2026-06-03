# Base image: Ruby with necessary dependencies for Jekyll
FROM ruby:3.2

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    nodejs \
    && rm -rf /var/lib/apt/lists/*


# Create a non-root user with UID 1000
RUN groupadd -g 1000 vscode && \
    useradd -m -u 1000 -g vscode vscode

# Set the working directory
WORKDIR /usr/src/app

# Set permissions for the working directory
RUN chown -R vscode:vscode /usr/src/app

# Copy Gemfile and Gemfile.lock into the container (necessary for `bundle install`)
# Copying the lockfile ensures the bundle resolver at build time installs the
# exact same versions the host expects, avoiding runtime mismatches when the
# project directory is bind-mounted over `/usr/src/app`.
COPY Gemfile Gemfile.lock ./

# Install bundler and dependencies as root during image build so gems are
# installed into the system gem location and are not lost when the host
# directory is bind-mounted over /usr/src/app at runtime.
RUN gem install connection_pool:2.5.0 && \
    gem install bundler:2.3.26 && \
    bundle install

# Install entrypoint script to a fixed path outside the bind-mount so it
# survives the volume overlay of /usr/src/app at runtime.
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Copy the rest of the application code
COPY . .

# Ensure the application files are owned by the non-root user and then switch
# to that user for runtime (safer execution).
RUN chown -R vscode:vscode /usr/src/app

# Switch to the non-root user
USER vscode

# Watches _config.yml and restarts Jekyll automatically on changes
CMD ["/usr/local/bin/entrypoint.sh"]

# Gemfile
#gem "minimal-mistakes-jekyll"
# or
#gem "academicpages"