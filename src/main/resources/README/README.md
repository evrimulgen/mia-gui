# MIA - Medical Image Analysis

The MIA framework is designed for performing calculations on large volumes of medical images (DICOM). 

The MIA framework is build using [Spring Cloud](http://projects.spring.io/spring-cloud/), the framework is a collection of [Spring Boot](http://projects.spring.io/spring-boot/) micro services.

The microservices in the framework can perform the following tasks:

1. Creating referenced DICOM packages (FileService)
2. Setting configuration for computations based on a DICOM port (ConfigurationService)
3. Mapping structure names to RTOG standards (MappingService)
4. Computations are validated and queued for distribution over workers
5. Computations are implemented in workers, our open source worker implements DVH calculation (Dose Volume Histograms), a worker plugin is available to create your own worker.
6. Results can be exported to SQL (H2, MSSQL, PostgreSQL) or SPARQL.


This application (Graphical User Interface) was generated using JHipster, you can find documentation and help at [https://jhipster.github.io](https://jhipster.github.io).

![MIA Design](src\main\resources\static\img\miadesign201605.png)





## General MIA Configuration ##

### Spring Boot configuration ###

The containerservice is a Spring Boot application. Spring Boot applications can be  externally configured, as described [here](http://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html).


The default profile "dev" can be changed to "prod" setting the following system variable:


`spring.profiles.active=prod`

or by setting the following property in a yaml file "application.yml" (place the application.yml next to the jar).



    spring.profiles.active: prod





## Usage ##

Run the Eureka Discovery Service.

Navigate to the Eureka Discovery Service in the browser (default http://localhost:8761). When the application is registered at Eureka, navigate to the application by clicking on the application instance in Eureka: "Instances currently registered with Eureka" column "status". 

The GUI contains a login screen, the default user name and password are: admin














## Development

Before you can build this project, you must install and configure the following dependencies on your machine:

1. [Node.js][]: We use Node to run a development web server and build the project.
   Depending on your system, you can install Node either from source or as a pre-packaged bundle.

After installing Node, you should be able to run the following command to install development tools (like
[Bower][] and [BrowserSync][]). You will only need to run this command when dependencies change in package.json.

    npm install

We use [Gulp][] as our build system. Install the Gulp command-line tool globally with:

    npm install -g gulp

Run the following commands in two separate terminals to create a blissful development experience where your browser
auto-refreshes when files change on your hard drive.

    ./mvnw
    gulp

Bower is used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in `bower.json`. You can also run `bower update` and `bower install` to manage dependencies.
Add the `-h` flag on any command to see how you can use it. For example, `bower update -h`.


## Building for production

To optimize the mia client for production, run:

    ./mvnw -Pprod clean package

This will concatenate and minify CSS and JavaScript files. It will also modify `index.html` so it references
these new files.

To ensure everything worked, run:

    java -jar target/*.war --spring.profiles.active=prod

Then navigate to [http://localhost:8080](http://localhost:8080) in your browser.

## Testing

Unit tests are run by [Karma][] and written with [Jasmine][]. They're located in `src/test/javascript/` and can be run with:

    gulp test

