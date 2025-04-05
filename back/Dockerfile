FROM golang:1.23-alpine AS build
WORKDIR /app
COPY . .
RUN go mod download
RUN go build -o main ./main.go

# Etapa de ejecución
FROM alpine:latest
WORKDIR /app
COPY --from=build /app/main ./main
EXPOSE 8080
CMD ["./main"]