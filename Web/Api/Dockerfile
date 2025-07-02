# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy project file first for better caching
COPY Api.csproj .
COPY global.json .

RUN dotnet restore

# Copy the rest of the source code including Firebase config
COPY . .

RUN dotnet publish -c Release -o out

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copy the published output
COPY --from=build /app/out .

# Expose port for Cloud Run
EXPOSE 8080
ENTRYPOINT ["dotnet", "Api.dll"]