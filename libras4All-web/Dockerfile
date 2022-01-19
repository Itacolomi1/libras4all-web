
FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build-env


WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:3.1
# ENV ASPNETCORE_URLS=http://+:80
WORKDIR /app
COPY --from=build-env /app/out .
# ENTRYPOINT ["dotnet", "libras4All-web.dll"]
CMD ASPNETCORE_URLS=http://*:$PORT dotnet libras4All-web.dll

EXPOSE 80