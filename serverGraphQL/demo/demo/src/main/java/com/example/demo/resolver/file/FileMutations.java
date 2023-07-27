package com.example.demo.resolver.file;

import com.example.demo.model.File;
import com.example.demo.model.Space;
import com.example.demo.repository.FileRepository;
import com.example.demo.repository.SpaceRepository;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

@Controller
public class FileMutations {

    @Autowired
    private FileRepository fileRepository;
    @Autowired
    private SpaceRepository spaceRepository;

    @SchemaMapping(typeName = "Mutation", value = "deleteFile")
    public File deleteFile(
            @Argument String fileId,
            @Argument String spaceId) {
        File file = fileRepository.findById(fileId).get();
        Space space = spaceRepository.findById(spaceId).get();
        space.getFiles().remove(file);
        fileRepository.delete(file);

        return file;
    }

}
