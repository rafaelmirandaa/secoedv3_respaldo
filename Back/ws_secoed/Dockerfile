#docker build -t secoed_ws_image:latest .

FROM base_python:latest
RUN apt-get update && \
    apt-get -y install --no-install-recommends \
    tzdata
WORKDIR /app/secoed
COPY . /app/secoed
RUN pip3 --no-cache-dir install -r src/utils/requerimientos.txt
CMD ["python3", "app.py"]