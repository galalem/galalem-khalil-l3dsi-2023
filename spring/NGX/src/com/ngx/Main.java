package com.ngx;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.*;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Main {

    private static final String ROOT = "C:/Users/khali/ISET/L3DSI/PFE/main/";
    private static final String JDK = "C:/Program Files/Java/jdk-19/bin";
    private static final String SPRING_OPTIONS = "-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=5005";
    private static final int CLOCK = 100;

    private static final State[] cycle = {
        new State("MySql", "C:/laragon/bin/mysql/mysql-5.7.33-winx64/bin", "net start MySQL & mysql --user=root --password=", "Starting SGBD", 10, 1000),
        new State("Keycloak", ROOT + "spring/keycloak-21.1.1/bin", "kc.bat start-dev", "Starting Keycloak", 22, 2000),
        new State("Config Server", JDK, "java.exe -jar " + ROOT + "spring/config-server/target/config-server-0.0.1-SNAPSHOT.jar com.ngx.config.ConfigServerApplication " + SPRING_OPTIONS, "Starting Centralized Configuration Server", 6, 1000),
        new State("Eureka Discovery Server", JDK, "java.exe -jar " + ROOT + "spring/eureka-discovery/target/eureka-discovery-0.0.1-SNAPSHOT.jar com.ngx.discovery.EurekaDiscoveryApplication " + SPRING_OPTIONS, "Starting Service Registry EUREKA Server", 26, 4000),
        new State("Gateway", JDK, "java.exe -jar " + ROOT + "spring/gateway/target/gateway-0.0.1-SNAPSHOT.jar com.ngx.gateway.Application " + SPRING_OPTIONS, "Starting API Gateway", 6, 1000),
        new State("Storage", JDK, "java.exe -jar " + ROOT + "spring/Storage/target/storage-0.0.1-SNAPSHOT.jar com.ngx.storage.Application " + SPRING_OPTIONS, "Starting Storage Micro-Service", 6, 1000),
        new State("Administration", JDK, "java.exe -jar " + ROOT + "spring/Administration/target/administration-0.0.1-SNAPSHOT.jar com.ngx.admin.Application " + SPRING_OPTIONS, "Starting Administration Micro-Service", 6, 1000),
        new State("Human Resources", JDK, "java.exe -jar " + ROOT + "spring/Human-Resources/target/human-resources-0.0.1-SNAPSHOT.jar com.ngx.hr.Application " + SPRING_OPTIONS, "Starting Human Resources Micro-Service", 6, 1000),
        new State("News", JDK, "java.exe -jar " + ROOT + "spring/News/target/news-0.0.1-SNAPSHOT.jar com.ngx.news.Application " + SPRING_OPTIONS, "Starting News Micro-Service", 6, 1000),
        new State("Schooling", JDK, "java.exe -jar " + ROOT + "spring/Schooling/target/schooling-0.0.1-SNAPSHOT.jar com.ngx.schooling.Application " + SPRING_OPTIONS, "Starting Schooling Micro-Service", 6, 1000),
        new State("Angular Web App", ROOT + "angular/app", "ng serve --open", "Building Web App", 0, 10000)
    };
    public static void main(String[] args) {
        new Main();
    }


    private Window window;
    private Runtime runtime;
    private int progress = 0;
    private int stateIndex = 0;
    private int timeout = 0;
    private final Timer timer = new Timer(CLOCK, new ActionListener() {

        @Override
        public void actionPerformed(ActionEvent e) {
            timeout += CLOCK;
            if (timeout < cycle[stateIndex].timeout)
                return;

            progress += cycle[stateIndex].progress;
            window.setProgress(progress);
            stateIndex++;
            timeout = 0;

            if (stateIndex >= cycle.length){
                timer.stop();
                System.exit(0);
                return;
            }

            window.setMessage(cycle[stateIndex].message);
            try {
                runtime.exec(start(cycle[stateIndex].title, cycle[stateIndex].path, cycle[stateIndex].command));
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
    });
    public Main() {
        try {
            window = Window.open();
            runtime = Runtime.getRuntime();

            State initial = cycle[0];
            window.setMessage(initial.message);
            runtime.exec(start(initial.title, initial.path, initial.command));

            timer.start();
        } catch (Exception ex) {
            Logger.getLogger(Main.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private static String start(String title, String path, String command){
        return String.format("cmd /c start \"%s\" /d \"%s\" /min cmd.exe /k \"%s\"", title, path, command);
    }

    public static class State {
        String title, path, command;
        String message;
        int progress;
        int timeout;

        public State(String title, String path, String command, String message, int progress, int timeout) {
            this.title = title;
            this.path = path;
            this.command = command;
            this.message = message;
            this.progress = progress;
            this.timeout = timeout;
        }
    }
}