FROM openjdk:17-slim

WORKDIR /app

# Copy Maven build artifact (JAR file)
COPY target/inventory-management-1.0.0.jar app.jar

# Expose application port
EXPOSE 8080

# Run Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]