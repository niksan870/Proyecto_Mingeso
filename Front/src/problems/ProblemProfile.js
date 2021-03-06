
import React, { Component } from 'react';
import axios from 'axios';
import ShowUser from './VisualizeProblem'
import EditUser from './EditProblem'
import { Grid, Row, Col, Button } from 'react-bootstrap';
import {arrowLeftLight} from 'react-icons-kit/metrize/arrowLeftLight'
import Icon from 'react-icons-kit';

class ProblemProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            idProblem: this.props.match.params.id,
            componentState: true,
            name: '',
            statement: '',
            language: '',
            ready:false
        };
        this.showUser = React.createRef();
        this.editUser = React.createRef();
        this.handleComponentChange = this.handleComponentChange.bind(this);
        this.handleComponent = this.handleComponent.bind(this);

    }
    componentDidMount() {
        let id_problem = this.state.idProblem;
        console.log(id_problem);
        //Por ahora es la id 6, cuando este el login bien se cambia por aquel que
        //esté logueado.
        let global_url = `http://35.226.163.50:8080/Backend`;
        let problem = axios.get(global_url + `/problem/get/` + id_problem)
            .then(res => {
                const problem = res.data;
                this.setState({
                    name: problem.name,
                    statement: problem.statement,
                    language: problem.language,
                    ready:true
                });
                console.log(problem);
            }).catch(error => {
                console.log(error.response);
            });
    }

    handleComponent() {
        let item;
        if (this.state.componentState) {
            item = <ShowUser ref={this.showUser} id={this.state.idProblem} />;

        } else {

            item = <EditUser ref={this.editUser} id={this.state.idProblem} />;

        }
        return item;
    }
    handleComponentChange() {
        if (this.state.componentState) {
            this.setState({ componentState: false });
        } else {
            this.setState({ componentState: true });
        }
    }
    handleEditButton() {
        let item;
        if (this.state.componentState) {
            item = <Button bsSize="large" onClick={this.handleComponentChange} bsStyle="warning" class="btn btn-primary">
                Editar</Button>;
        } else {
            item =
                <Button bsSize="large" onClick={this.handleComponentChange} bsStyle="warning" class="btn btn-primary">
                    Finalizar</Button>;
        }
        return item;
    }

    handleBack()
    {
        if(this.state.componentState)
        {
            return(<Button href={`/problems/show`} bsSize="large" bsStyle="warning" class="btn btn-primary">Volver</Button>);
        }
        else
        {
            return(<Button href={`/problemsProfile/`+this.state.idProblem} bsSize="large"  bsStyle="warning" class="btn btn-primary">Cancelar</Button>);
        }
    }

    render() {
        const role = localStorage.getItem('role');
        console.log(role);
        if ( role === "student"){ 
                    return(  
                        <Grid>
                            <Row>
                            <div class="container">
                            <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12">
                            <Col md={1} sm={4} smOffset = {0.1} >
                                        <a href={`/problems/show`}> <Icon icon={arrowLeftLight} size={25}  style={{color:'#415171'}} /></a>                                
                                        </Col>
                                <br/>
                                <br/>
                                <br/>
                                <br/>        
                                <div class="well well-sm">
                                    <Row>
                                        <Col md={9} sm={9}>

                                            {this.handleComponent()}
                                           
                                        </Col>
                                    </Row>
                                </div>
                                </div>
                                </div>
                                </div>
                                </Row>

                             </Grid>
                            )  
                                
        }
        else{    
            return (
            <Grid>
                
                <Row>
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12">
                            <Col md={1} sm={4} smOffset = {0.1} >
                                        <a href={`/problems/show`}> <Icon icon={arrowLeftLight} size={25}  style={{color:'#415171'}} /></a>                                
                                        </Col>
                                <br/>
                                <br/>
                                <br/>
                                <br/>        
                                <div class="well well-sm">
                                    <Row>
                                        <Col md={9} sm={9}>

                                            {this.handleComponent()}
                                            <br />
                                            <div class="btn-group">
                                                {this.handleEditButton()}
                                                {this.handleBack()}
                                            </div>

                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>

            </Grid>
            );
        }   
    }




}
export default ProblemProfile;                