package com.example.demo.resolver.file;

import com.example.demo.model.File;
import com.example.demo.repository.FileRepository;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

@Controller
public class FileQueries {
    @Autowired
    private FileRepository fileRepository;

    @SchemaMapping(typeName = "Query", value = "findAllFiles")
    public List<File> findAll() {
        return fileRepository.findAll();
    }

    }







