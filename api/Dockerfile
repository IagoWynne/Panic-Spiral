FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS publish
WORKDIR /src
COPY . .
RUN dotnet restore
RUN dotnet publish -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish ./app .
ENTRYPOINT [ "dotnet", "PanicSpiral.API.dll" ]