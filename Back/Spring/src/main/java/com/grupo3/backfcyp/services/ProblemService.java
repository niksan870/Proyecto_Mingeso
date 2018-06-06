package com.grupo3.backfcyp.services;


import com.grupo3.backfcyp.models.Parameter;
import com.grupo3.backfcyp.models.Problem;
import com.grupo3.backfcyp.models.Return;
import com.grupo3.backfcyp.models.Teacher;
import com.grupo3.backfcyp.repositories.ParameterReporitory;
import com.grupo3.backfcyp.repositories.ProblemRepository;
import com.grupo3.backfcyp.repositories.ReturnRepository;
import com.grupo3.backfcyp.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/problems")
public class ProblemService {


    @Autowired
    private ProblemRepository problemRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private ParameterReporitory parameterReporitory;
    @Autowired
    private ReturnRepository returnRepository;

    @CrossOrigin()
    @RequestMapping(method = RequestMethod.GET)
    public List<Problem> getProblems(){

        return this.problemRepository.findAll();
    }

    @CrossOrigin()
    @RequestMapping(value = "/get/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Problem getProblemById(@PathVariable Long id){
        return this.problemRepository.findProblemById(id);
    }



    //Servicio para obtener el usuario relacionado a un problema, según la ID.
    @CrossOrigin()
    @RequestMapping(value = "/{id}/getUser", method = RequestMethod.GET)
    @ResponseBody
    public String getUser(@PathVariable Long id){

        return this.problemRepository.findProblemById(id).getTeacher().getName();
    }

    //Se agrega un problema asociado a un usuario
    @CrossOrigin()
    @RequestMapping(value = "/createProblem/{id}",method = RequestMethod.POST)
    @ResponseBody
    public Problem createProblem(@PathVariable Long id, @RequestBody Problem problem ){


        //Si el usuario existe.
        if(teacherRepository.findTeacherById(id) != null){
            Teacher teacher=teacherRepository.findTeacherById(id);
            List<Problem> problems = teacher.getProblems();
            problems.add(problem);
            teacher.setProblems(problems);
            System.out.println(problem.getParameters());
            problem.setTeacher(teacherRepository.findTeacherById(id));
            List<Parameter> parameters = problem.getParameters();
            List<Return> returns = problem.getReturns();
            //problem.setParameters(null);
            //problem.setReturns(null);


            for(Parameter parameter: problem.getParameters()){
                parameter.setProblem(problem);
                //this.parameterReporitory.save(parameter);
            }
            for(Return return_: problem.getReturns()){
                return_.setProblem(problem);
                //this.returnRepository.save(return_);
            }
            this.problemRepository.save(problem);
            //problem.setReturns(returns);
            //problem.setParameters(parameters);

            return problem;
        }else{
            //Se debe imprimir por la página
            System.out.printf("El usuario no existe!\n");
            return null;
        }
    }
    @CrossOrigin()
    @PutMapping(value = "/createProblem/{id}/put")
    @ResponseBody
    public Problem updateProblem(@PathVariable Long id,@Valid @RequestBody Problem problem){
        return this.problemRepository.save(problem);
    }

    /*
    @PostMapping("/{userId}/problems")
    @ResponseBody
    public Problem createProblem(@PathVariable (value = "userId") Long id_user,
                                 @Valid @RequestBody Problem problem   ) {


    }
*/
}
