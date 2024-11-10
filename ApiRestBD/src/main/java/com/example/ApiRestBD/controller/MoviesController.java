package com.example.ApiRestBD.controller;

import com.example.ApiRestBD.models.Movies;
import com.example.ApiRestBD.repositories.MoviesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import java.lang.classfile.instruction.ReturnInstruction;
import java.util.List;
import java.util.Optional;

@RestController
public class MoviesController {

    @Autowired
    MoviesRepository repository;

    //public MoviesController(MoviesRepository repository) {        //Ya no se usa por el @Autowired
    //  this.repository = repository;
    //}

//    @GetMapping("/api/createmovies")
//    public void createmovies(){
//        Movies movie1 = new Movies("Titanic", "James Cameron", "Drama");
//        Movies movie2 = new Movies("Forest Gump", "Robert Zemekis", "Drama");
//        Movies movie3 = new Movies("Star Wars", "George Lucas", "Ciencia Ficción");
//
//        repository.save(movie1);
//        repository.save(movie2);
//        repository.save(movie3);
//    }
    @CrossOrigin("http://127.0.0.1:5500")
    @GetMapping("/api/movies")
    public List <Movies> getmovies(){
        return repository.findAll();
    }

    @CrossOrigin("http://127.0.0.1:5500")
    @GetMapping("/api/movie/{id}")
    public ResponseEntity<Movies> getmovie (@PathVariable Long id){
        Optional<Movies> opt = repository.findById(id);
        if (opt.isEmpty()){
            return ResponseEntity.badRequest().build();
        }
        else {return ResponseEntity.ok(opt.get());
        }
    }
    //@CrossOrigin("http://127.0.0.1:5500/Formulario.html")
    @CrossOrigin("http://127.0.0.1:5500")
    @PostMapping("/api/movies")
    public ResponseEntity<Movies> savemovie (@RequestBody Movies movies){
        if (movies.getId() != null){
            return ResponseEntity.badRequest().build();
        }
        repository.save(movies);
        return ResponseEntity.ok(movies);
    }

    @CrossOrigin("http://127.0.0.1:5500")
    @PutMapping("/api/movies")
    public ResponseEntity<Movies> updatemovie (@RequestBody Movies movies){
        if (movies.getId() == null || !repository.existsById(movies.getId())){
            return ResponseEntity.badRequest().build();
        }
        repository.save(movies);
        return ResponseEntity.ok(movies);
    }

    @CrossOrigin("http://127.0.0.1:5500")
    @DeleteMapping("/api/movies/{id}")
    public ResponseEntity<Movies> deletemovie (@PathVariable Long id){
        if (id == null || !repository.existsById(id)){
            return ResponseEntity.badRequest().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
