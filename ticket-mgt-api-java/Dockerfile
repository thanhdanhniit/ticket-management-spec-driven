# Stage 1: Build the application securely using a Maven + JDK image
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app

# First, copy only the pom.xml and download dependencies 
# This layer caches dependencies natively unless pom.xml actually changes
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the exact source code required and package the application
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Create a minimal production-ready JRE image
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Expose standardized port
EXPOSE 8080

# Create a designated data volume explicitly allowing persistent H2 disk storage external to container re-creation
VOLUME /app/data

# Copy the built artifact aggressively from the build stage exclusively
COPY --from=build /app/target/ticket-mgt-api-java-0.0.1-SNAPSHOT.jar app.jar

# Run the basic Java application with standard memory limits logically
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
