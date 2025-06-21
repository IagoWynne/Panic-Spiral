FROM mcr.microsoft.com/dotnet/sdk:9.0 AS base
WORKDIR /app
COPY . .

ENV URLS="http://+:8080"

ENTRYPOINT [ "dotnet", "run" ]